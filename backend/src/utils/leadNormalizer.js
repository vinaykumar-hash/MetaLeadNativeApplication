const FIELD_MAP = {
  name: ['full_name', 'nome_completo', 'name'],
  email: ['email', 'e-mail'],
  phone: ['phone_number', 'phone', 'telefone'],
};

function findFieldValue(fieldData, possibleNames) {
  for (const fieldName of possibleNames) {
    const match = fieldData.find(
      (f) => f.name.toLowerCase() === fieldName.toLowerCase()
    );
    if (match && match.values && match.values.length > 0) {
      return match.values[0];
    }
  }
  return null;
}

function normalizeLead(rawLead) {
  const fieldData = rawLead.field_data || [];

  return {
    id: rawLead.id,
    name: findFieldValue(fieldData, FIELD_MAP.name),
    email: findFieldValue(fieldData, FIELD_MAP.email),
    phone: findFieldValue(fieldData, FIELD_MAP.phone),
    createdAt: rawLead.created_time || new Date().toISOString(),
  };
}

module.exports = { normalizeLead };
