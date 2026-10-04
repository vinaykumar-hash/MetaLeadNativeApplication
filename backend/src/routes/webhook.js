const express = require('express');
const router = express.Router();
const config = require('../config');
const { fetchLeadById } = require('../services/metaService');
const { normalizeLead } = require('../utils/leadNormalizer');
const { emitNewLead } = require('../services/socketService');

const processedLeadIds = new Set();

router.get('/', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === config.verifyToken) {
    console.log('Webhook verification succeeded');
    return res.status(200).send(challenge);
  }

  console.warn('Webhook verification failed — token mismatch or wrong mode');
  return res.sendStatus(403);
});

router.post('/', async (req, res) => {
  const body = req.body;

  if (body.object !== 'page') {
    return res.sendStatus(200);
  }

  console.log('Meta webhook received');

  res.sendStatus(200);

  const entries = body.entry || [];

  for (const entry of entries) {
    const changes = entry.changes || [];

    for (const change of changes) {
      if (change.field !== 'leadgen') continue;

      const leadgenId = change.value && change.value.leadgen_id;
      const pageId = change.value && change.value.page_id;
      const formId = change.value && change.value.form_id;

      if (!leadgenId) {
        console.warn('leadgen change received without leadgen_id — skipping');
        continue;
      }

      if (processedLeadIds.has(leadgenId)) {
        console.log(`Duplicate lead ${leadgenId} — skipping`);
        continue;
      }

      console.log(`Lead ID received: ${leadgenId}`);

      try {
        const rawLead = await fetchLeadById(leadgenId);
        console.log('Lead retrieved successfully');

        const lead = normalizeLead(rawLead);

        lead.pageId = pageId || null;
        lead.formId = formId || null;

        processedLeadIds.add(leadgenId);
        emitNewLead(lead);
      } catch (err) {
        const status = err.response ? err.response.status : 'N/A';
        const message = err.response
          ? err.response.data && err.response.data.error && err.response.data.error.message
          : err.message;
        console.error(`Unable to retrieve lead from Meta (HTTP ${status}): ${message}`);
      }
    }
  }
});

module.exports = router;
