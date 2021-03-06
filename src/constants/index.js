'use strict'

module.exports = {
  ACTIVITY: require('./activity'),
  CONTEXT: require('./context'),
  COLUMNS: require('./columns'),
  DND: require('./dnd'),
  EDIT: require('./edit'),
  FLASH: require('./flash'),
  ESPER: require('./esper'),
  HISTORY: require('./history'),
  IMPORTS: require('./import'),
  ITEM: require('./item'),
  KEYMAP: require('./keymap'),
  LIST: require('./list'),
  LOCALE: require('./locale'),
  METADATA: require('./metadata'),
  NAV: require('./nav'),
  NOTE: require('./note'),
  ONTOLOGY: require('./ontology'),
  PHOTO: require('./photo'),
  PREFS: require('./prefs'),
  PROJECT: require('./project'),
  QR: require('./qr'),
  SASS: require('./sass'),
  SELECTION: require('./selection'),
  SETTINGS: require('./settings'),
  SHELL: require('./shell'),
  STORAGE: require('./storage'),
  TABS: require('./tabs'),
  TAG: require('./tag'),
  TYPE: require('./type'),
  UI: require('./ui'),
  WIZARD: require('./wizard'),
  ...require('./rdf')
}
