'use strict'

const res = require('../common/res')
const { basename } = require('path')
const { warn } = require('../common/log')
const { Menu } = require('electron')

module.exports = class AppMenu {
  constructor(app) {
    this.app = app
  }

  update() {
    return Menu.setApplicationMenu(this.menu), this
  }

  // find(ids, menu = this.menu) {
  //   const [id, ...tail] = ids
  //   const item = menu.items.find(x => x.id === id)

  //   if (!tail.length) return item
  //   if (!item.submenu) return undefined

  //   return this.find(tail, item.submenu)
  // }

  async load(name = 'app') {
    let template = (await res.Menu.open(name)).template
    this.menu = this.build(template)

    return this.update()
  }

  responder(command) {
    let [prefix, action] = command.split(':')

    switch (prefix) {
      case 'app':
        return (_, win) => this.app.emit(command, win)
      case 'win':
        return (_, win) => win[action]()
      default:
        warn(`no responder for menu command ${command}`)
    }
  }

  build(template) {
    return Menu.buildFromTemplate(this.translate(template))
  }

  translate(template) {
    return template.map(item => {
      item = { ...item }

      // Hiding of root items does not work at the moment.
      // See Electron #2895
      if (item.environment) {
        item.visible = item.environment === this.app.environment
      }

      if (item.debug && this.app.debug) {
        item.visible = true
      }

      if (item.command) {
        item.click = this.responder(item.command)
      }

      if (item.label) {
        item.label = item.label
          .replace(/%(\w+)/g, (_, prop) => this.app[prop])
      }

      if (item.submenu) {
        item.submenu = this.translate(item.submenu)
      }

      // Electron does not support removing menu items
      // dynamically (#527), therefore we currently populate
      // recent projects only in the translation loop.
      if (item.id === 'recent') {
        if (this.app.state.recent.length) {
          item.enabled =  true

          item.submenu = [
            ...this.app.state.recent.map((file, idx) => ({
              label: `${idx + 1}. ${basename(file)}`,
              click: () => this.app.open(file)
            })),
            ...item.submenu
          ]
        }
      }

      return item
    })
  }

}
