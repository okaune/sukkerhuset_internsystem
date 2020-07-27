import graphqlFields from 'graphql-fields'

const fieldsMap = info => {
  return graphqlFields(info, {}, { excludedFields: ['__typename'] })
}

const isEmpty = obj => {
  return Object.getOwnPropertyNames(obj).length === 0
}

// Whether the info object contains any non-flat (i.e. nested) fields
export const hasSubfields = info => {
  return Object.values(fieldsMap(info)).some(subfields => !isEmpty(subfields))
}

// Space-separated fields as requested in the info object
export const fields = info => {
  return Object.keys(fieldsMap(info)).join(' ')
}
