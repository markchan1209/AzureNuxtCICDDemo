/* eslint-disable camelcase */
import Vue from 'vue'
import VueI18n from 'vue-i18n'

import TW from '@/locales/TW.json'
import EN from '@/locales/EN.json'
import CN from '@/locales/CN.json'
import JP from '@/locales/JP.json'
import KR from '@/locales/KR.json'

// ElementUI 国际化
import element_locale from 'element-ui/lib/locale'
import element_zh_TW from 'element-ui/lib/locale/lang/zh-TW'
import element_en_US from 'element-ui/lib/locale/lang/en'
import element_zh_CN from 'element-ui/lib/locale/lang/zh-CN'
import element_ja from 'element-ui/lib/locale/lang/ja'
import element_ko from 'element-ui/lib/locale/lang/ko'

Vue.use(VueI18n)

const messages = {
  TW: Object.assign(TW, element_zh_TW),
  EN: Object.assign(EN, element_en_US),
  CN: Object.assign(CN, element_zh_CN),
  JP: Object.assign(JP, element_ja),
  KR: Object.assign(KR, element_ko)
}

export default ({ app, route }, inject) => {
  app.i18n = new VueI18n({
    locale: route.params.lang || 'TW',
    fallbackLocale: 'TW',   //我这里默认语言为英文
    messages
  })

  app.i18n.path = (link) => {
    // 如果是默认语言，就省略
    if (app.i18n.locale === app.i18n.fallbackLocale) {
      return `/${link}`
    }
    return `/${app.i18n.locale}/${link}`
  }

  // 为了实现element插件的多语言切换
  element_locale.i18n((key, value) => app.i18n.t(key, value))

  inject('i18n', app.i18n)
}
