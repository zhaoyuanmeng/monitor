import {initOption} from '../types/base'

const config:initOption = {
  url: "",
  appID: "",
  userID: "",
  vue: {
    Vue: null,
    router: null,
  },
  react: {
    React: null,
    router: null,
  },
};

export function setConfig(options: initOption):initOption {
  let k : keyof initOption
  for (k in config) {
    if (options[k]) {
      config[k]  = options[k] as never
    }
  }
  return config
}

