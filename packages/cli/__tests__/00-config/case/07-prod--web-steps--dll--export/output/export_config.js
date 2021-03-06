const DEFAULT_PORT = 8080;
const webpack = require("webpack");
const path = require("path");
const path__default = path;
const fs__default = require("fs");
const requireFromString = require("require-from-string");
const requireSourceString = function requireSourceString(
  path,
  opts = { fs: require("fs") }
) {
  if (opts.fs.existsSync(path)) {
    let source = opts.fs.readFileSync(path, "utf-8");
    if (path.endsWith(".json")) {
      source = "module.exports = " + source;
    }
    return source + "";
  }
};
const requireFromPath = function requireFromPath(
  path,
  opts = { fs: require("fs") }
) {
  const source = requireSourceString(path, opts);
  try {
    if (path.endsWith(".html")) {
      return source;
    }
    const ex = requireFromString(source, path);
    return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
  } catch (error) {
    throw new Error(`[requireFromPath] ${path} Error: ${error}`);
  }
};
const webpackMerge = require("webpack-merge");
const merge = function merge(...args) {
  return args.reduce((t, o) => {
    if (!o) return t;
    if (t === o) return t;
    return mergeBase(t, cloneDeep(o));
  }, args[0]);
};
const mergeBase = function mergeBase(src, target) {
  if (typeof target !== "object" || typeof src !== "object") return target;
  Object.keys(target).forEach(t => {
    if (typeof target[t] === "object" && typeof src[t] === "object") {
      src[t] = mergeBase(src[t], target[t]);
    } else {
      src[t] = target[t];
    }
  });
  return src;
};
const cloneDeep = function cloneDeep(data) {
  if (typeof data !== "object") return data;
  if (data instanceof RegExp) return data;
  if (data instanceof Array) {
    return data.map(d => {
      return cloneDeep(d);
    });
  }
  return Object.keys(data).reduce((t, o) => {
    t[o] = cloneDeep(data[o]);
    return t;
  }, {});
};
const {
  base,
  client,
  server
} = require("@web-steps/config/dist/get-default-webpack-config");
const { args, setting, isDev } = {
  args: {
    rootDir:
      "/Users/sunhao/Documents/imsunhao/utils/packages/cli/__tests__/00-config/case/07-prod--web-steps--dll--export",
    injectContext: undefined,
    settingPath: "web-steps.json",
    skipCompilerConfig: undefined,
    forceCompilerConfig: undefined,
    majorCommand: "config",
    minorCommand: "export",
    env: "production",
    target: "SSR",
    port: undefined,
    skipBuild: false,
    skipTests: false,
    skipDeploy: false,
    skipVersion: false,
    skipChangelog: false,
    skipGit: false,
    skipRunBin: false,
    dry: undefined,
    downloadManifestPath: undefined,
    helper: false,
    debugPort: 32000,
    debugPath: "node_modules/@web-steps/cli/bin/web-steps"
  },
  setting: {
    entry:
      "/Users/sunhao/Documents/imsunhao/utils/packages/cli/__tests__/00-config/case/07-prod--web-steps--dll--export/config.ts",
    output:
      "/Users/sunhao/Documents/imsunhao/utils/packages/cli/__tests__/00-config/case/07-prod--web-steps--dll--export/output",
    cache:
      "/Users/sunhao/Documents/imsunhao/utils/packages/cli/__tests__/00-config/case/07-prod--web-steps--dll--export/.web-steps_cache"
  },
  isDev: false
};
const resolve = function resolve(...paths) {
  return path.resolve.apply(undefined, [args.rootDir, ...paths]);
};
const context = { startupOptions: { args, resolve }, isDev, setting };
context.userConfigConstructor = /******/ (function(modules) {
  // webpackBootstrap
  /******/ // The module cache
  /******/ var installedModules = {}; // The require function
  /******/
  /******/ /******/ function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/ if (installedModules[moduleId]) {
      /******/ return installedModules[moduleId].exports;
      /******/
    } // Create a new module (and put it into the cache)
    /******/ /******/ var module = (installedModules[moduleId] = {
      /******/ i: moduleId,
      /******/ l: false,
      /******/ exports: {}
      /******/
    }); // Execute the module function
    /******/
    /******/ /******/ modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    ); // Flag the module as loaded
    /******/
    /******/ /******/ module.l = true; // Return the exports of the module
    /******/
    /******/ /******/ return module.exports;
    /******/
  } // expose the modules object (__webpack_modules__)
  /******/
  /******/
  /******/ /******/ __webpack_require__.m = modules; // expose the module cache
  /******/
  /******/ /******/ __webpack_require__.c = installedModules; // define getter function for harmony exports
  /******/
  /******/ /******/ __webpack_require__.d = function(exports, name, getter) {
    /******/ if (!__webpack_require__.o(exports, name)) {
      /******/ Object.defineProperty(exports, name, {
        enumerable: true,
        get: getter
      });
      /******/
    }
    /******/
  }; // define __esModule on exports
  /******/
  /******/ /******/ __webpack_require__.r = function(exports) {
    /******/ if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
      /******/ Object.defineProperty(exports, Symbol.toStringTag, {
        value: "Module"
      });
      /******/
    }
    /******/ Object.defineProperty(exports, "__esModule", { value: true });
    /******/
  }; // create a fake namespace object // mode & 1: value is a module id, require it // mode & 2: merge all properties of value into the ns // mode & 4: return value when already ns object // mode & 8|1: behave like require
  /******/
  /******/ /******/ /******/ /******/ /******/ /******/ __webpack_require__.t = function(
    value,
    mode
  ) {
    /******/ if (mode & 1) value = __webpack_require__(value);
    /******/ if (mode & 8) return value;
    /******/ if (
      mode & 4 &&
      typeof value === "object" &&
      value &&
      value.__esModule
    )
      return value;
    /******/ var ns = Object.create(null);
    /******/ __webpack_require__.r(ns);
    /******/ Object.defineProperty(ns, "default", {
      enumerable: true,
      value: value
    });
    /******/ if (mode & 2 && typeof value != "string")
      for (var key in value)
        __webpack_require__.d(
          ns,
          key,
          function(key) {
            return value[key];
          }.bind(null, key)
        );
    /******/ return ns;
    /******/
  }; // getDefaultExport function for compatibility with non-harmony modules
  /******/
  /******/ /******/ __webpack_require__.n = function(module) {
    /******/ var getter =
      module && module.__esModule
        ? /******/ function getDefault() {
            return module["default"];
          }
        : /******/ function getModuleExports() {
            return module;
          };
    /******/ __webpack_require__.d(getter, "a", getter);
    /******/ return getter;
    /******/
  }; // Object.prototype.hasOwnProperty.call
  /******/
  /******/ /******/ __webpack_require__.o = function(object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  }; // __webpack_public_path__
  /******/
  /******/ /******/ __webpack_require__.p = ""; // Load entry module and return exports
  /******/
  /******/
  /******/ /******/ return __webpack_require__((__webpack_require__.s = 1));
  /******/
})(
  /************************************************************************/
  /******/ [
    /* 0 */
    /***/ function(module, exports) {
      module.exports = require("clean-webpack-plugin");

      /***/
    },
    /* 1 */
    /***/ function(module, __webpack_exports__, __webpack_require__) {
      "use strict";
      __webpack_require__.r(__webpack_exports__);

      // CONCATENATED MODULE: ./packages/cli/__tests__/00-config/case/06-prod--web-steps--dll/config/webpack-base.ts
      const getConfig = function({ resolve }) {
        return {
          optimization: {
            minimize: false
          },
          output: {
            path: resolve("./dist"),
            publicPath: "/output/"
          }
        };
      };
      /* harmony default export */ var webpack_base = getConfig;

      // EXTERNAL MODULE: external "clean-webpack-plugin"
      var external_clean_webpack_plugin_ = __webpack_require__(0);

      // CONCATENATED MODULE: ./packages/cli/__tests__/00-config/case/06-prod--web-steps--dll/config/webpack-client.ts

      const webpack_client_getConfig = function({ resolve }) {
        return {
          entry: {
            client: resolve("./src/entry-client.ts")
          },
          plugins: [new external_clean_webpack_plugin_["CleanWebpackPlugin"]()]
        };
      };
      /* harmony default export */ var webpack_client = webpack_client_getConfig;

      // CONCATENATED MODULE: ./packages/cli/__tests__/00-config/case/06-prod--web-steps--dll/config/webpack-server.ts
      const webpack_server_getConfig = function({ resolve }) {
        return {
          entry: {
            server: resolve("./src/entry-server.ts")
          }
        };
      };
      /* harmony default export */ var webpack_server = webpack_server_getConfig;

      // CONCATENATED MODULE: ./packages/cli/__tests__/00-config/case/06-prod--web-steps--dll/web-steps.ts

      const web_steps_getConfig = function({ resolve }) {
        return {
          src: {
            SSR: {
              base: { webpack: webpack_base },
              client: { webpack: webpack_client },
              server: {
                webpack: webpack_server,
                render: {
                  templatePath: resolve("index.template.html")
                }
              }
            },
            DLL: {
              Vue: ["vue"],
              Vuex: ["vuex"],
              VueRouter: ["vue-router"]
            }
          }
        };
      };
      /* harmony default export */ var web_steps = (__webpack_exports__[
        "default"
      ] = web_steps_getConfig);

      /***/
    }
    /******/
  ]
).default;
context.userLifeCycleConstructor = undefined;
const stuffConfig = function stuffConfig(defaultWebpackConfig, DEFAULT_PORT) {
  this.config = this.userConfigConstructor(this.startupOptions);
  const target = this.startupOptions.args.target;
  const resolve = this.startupOptions.resolve;
  if (!this.config.rootDir) {
    this.config.rootDir = this.startupOptions.args.rootDir;
  }
  if (!this.config.static) {
    this.config.static = {
      path: resolve("./static")
    };
  }
  if (!this.config.public) {
    this.config.public = {
      path: resolve("./public")
    };
  }
  if (this.startupOptions.args.injectContext) {
    const injectContextPath = this.startupOptions.args.injectContext;
    this.config.injectContext = injectContextPath.startsWith("/")
      ? injectContextPath
      : resolve(injectContextPath);
  } else if (!this.config.injectContext)
    this.config.injectContext = resolve("./inject-context.ts");
  if (this.config.customBuild) {
    this.config.customBuild = this.config.customBuild.map(webpackConfig => {
      return webpackConfig instanceof Function
        ? webpackConfig(this.startupOptions, this.config)
        : webpackConfig;
    });
  }
  if (!this.config.src) this.config.src = {};
  const dockerDefaultOutputPath = path__default.resolve(
    this.setting.output,
    "Dockerfile"
  );
  if (!this.config.docker) {
    this.config.docker = {
      enable: false,
      outputPath: dockerDefaultOutputPath,
      templatePath: ""
    };
  } else {
    if (!this.config.docker.outputPath)
      this.config.docker.outputPath = dockerDefaultOutputPath;
  }
  this.config.port =
    this.startupOptions.args.port ||
    process.env.PORT ||
    this.config.port ||
    DEFAULT_PORT;
  process.env.PORT = this.config.port;
  if (target === "SSR") {
    if (!this.config.src.SSR) this.config.src.SSR = {};
    const SSR = this.config.src.SSR;
    const stuffServer = () => {
      if (!SSR.client) SSR.client = {};
      if (!SSR.server) SSR.server = {};
      if (!SSR.server.lifeCycle)
        SSR.server.lifeCycle = resolve("server/life-cycle");
      if (!SSR.client.exclude) SSR.client.exclude = [];
      if (!SSR.server.exclude) SSR.server.exclude = [];
      if (!SSR.server.whitelist) SSR.server.whitelist = [];
      SSR.server.exclude.push(
        {
          module: /\.css$/,
          exclude: true
        },
        {
          module: /\?vue&type=style/
        }
      );
      const excludeWhiteList = SSR.server.exclude.map(options => {
        return typeof options === "string" || !("module" in options)
          ? options
          : options.module;
      });
      SSR.server.whitelist = SSR.server.whitelist.concat(excludeWhiteList);
    };
    const stuffWebpack = () => {
      const {
        getDefaultBaseWebpackConfig,
        getDefaultClientWebpackConfig,
        getDefaultServerWebpackConfig
      } = defaultWebpackConfig;
      const defaultBaseWebpackConfig = getDefaultBaseWebpackConfig(
        this.startupOptions,
        this.config
      );
      const defaultClientWebpackConfig = getDefaultClientWebpackConfig(
        this.startupOptions,
        this.config
      );
      const defaultServerWebpackConfig = getDefaultServerWebpackConfig(
        this.startupOptions,
        this.config
      );
      const result = {
        base: {},
        client: {},
        server: {}
      };
      Object.keys(result).forEach(key => {
        if (SSR[key]) {
          let webpackConfig = SSR[key].webpack;
          if (webpackConfig instanceof Function) {
            webpackConfig = webpackConfig(this.startupOptions, this.config);
          }
          result[key] = webpackConfig || {};
        } else {
          SSR[key] = { webpack: {} };
        }
      });
      const baseWebpackConfig = webpackMerge(
        defaultBaseWebpackConfig,
        result.base,
        {
          output: {
            path: this.setting.output
          }
        }
      );
      SSR.base.webpack = baseWebpackConfig;
      SSR.client.webpack = webpackMerge(
        baseWebpackConfig,
        defaultClientWebpackConfig,
        result.client
      );
      if (this.isDev) {
        const clientConfig = SSR.client.webpack;
        const addWebpackHotMiddleware = () => {
          const getEntry = entry => {
            if (typeof entry === "string") entry = [entry];
            if (entry instanceof Array) {
              // 'eventsource-polyfill' IE 支持
              entry.unshift("webpack-hot-middleware/client");
              return entry;
            }
            return false;
          };
          const entry = getEntry(clientConfig.entry);
          if (entry) {
            clientConfig.entry = entry;
          } else if (clientConfig.entry instanceof Function) {
            exports.log.error(
              "config 目前不支持 clientConfig.entry instanceof Function"
            );
          } else {
            const configEntry = clientConfig.entry;
            clientConfig.entry = Object.keys(clientConfig.entry).reduce(
              (entry, key) => {
                entry[key] = getEntry(configEntry[key]);
                return entry;
              },
              {}
            );
          }
          clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
        };
        addWebpackHotMiddleware();
        clientConfig.output.filename = "[id].[name].[hash:5].js";
      }
      SSR.server.webpack = webpackMerge(
        baseWebpackConfig,
        defaultServerWebpackConfig,
        result.server
      );
    };
    stuffServer();
    stuffWebpack();
  }
  if (process.env.RELEASE) {
    const releaseConfig = this.config.release.target[process.env.RELEASE];
    if (releaseConfig) {
      if (releaseConfig.injectContext) {
        const injectContextPath = releaseConfig.injectContext;
        this.config.injectContext = injectContextPath.startsWith("/")
          ? injectContextPath
          : resolve(injectContextPath);
      }
    } else {
      console.warn(`未找到 ${process.env.RELEASE} 对应的 release 配置!`);
    }
  }
  if (fs__default.existsSync(this.config.injectContext)) {
    this.config.injectContext = getConfigWebpackConfig(
      "inject-context",
      this.config.injectContext,
      this.setting.cache,
      this.config.src.SSR.base.webpack
    );
  } else {
    this.config.injectContext = undefined;
  }
};
const stuffConfigByDll = function stuffConfigByDll(
  userDLLManifest,
  requireFromPath
) {
  if (!this.config.src.DLL) return;
  Object.keys(this.config.src.DLL).forEach(key => {
    const manifestPath = path__default.resolve(
      this.setting.output,
      `${key}.manifest.json`
    );
    const manifest = requireFromPath(manifestPath);
    this.config.src.SSR.client.webpack.plugins.push(
      new webpack.DllReferencePlugin({
        context: this.config.rootDir || "",
        manifest,
        name: manifest.name
      })
    );
  });
  this.config.src.DLL = userDLLManifest.all;
};
const stuffServer = function stuffServer(merge) {
  const SSR = this.config.src.SSR;
  if (!this.isDev) {
    if (this.userLifeCycleConstructor) {
      SSR.server.lifeCycle = this.userLifeCycleConstructor(this.startupOptions);
    } else {
      SSR.server.lifeCycle = {};
    }
  } else {
    const defaultLifeCycleConfigWebpackConfig = this.getDefaultLifeCycleConfigWebpackConfig();
    SSR.server.lifeCycle = defaultLifeCycleConfigWebpackConfig || {};
  }
  const outputPath = SSR.server.webpack.output
    ? SSR.server.webpack.output.path
    : "";
  let render;
  if (SSR.server.webpack.output) {
    render = {
      bundlePath: path__default.resolve(
        outputPath,
        "vue-ssr-server-bundle.json"
      ),
      clientManifestPath: path__default.resolve(
        outputPath,
        "vue-ssr-client-manifest.json"
      ),
      templatePath: ""
    };
  }
  SSR.server.render = merge(render || {}, SSR.server.render);
};
const nodeExternals = require("webpack-node-externals");
const getConfigWebpackConfig = function getConfigWebpackConfig(
  name,
  entryPath,
  outputPath,
  base = {}
) {
  return webpackMerge(
    {
      resolve: base.resolve
    },
    {
      name,
      mode: "production",
      devtool: false,
      target: "node",
      optimization: {
        minimize: false
      },
      entry: {
        [name]: entryPath
      },
      output: {
        path: outputPath,
        filename: "[name].js",
        libraryTarget: "commonjs2"
      },
      externals: [nodeExternals()],
      resolve: {
        extensions: [".ts", ".js", ".json"]
      },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: ["ts-loader"]
          }
        ]
      }
    }
  );
};
context.getDefaultLifeCycleConfigWebpackConfig = function getDefaultLifeCycleConfigWebpackConfig() {
  const lifeCycle = this.config.src.SSR.server.lifeCycle;
  if (
    !fs__default.existsSync(lifeCycle) &&
    !fs__default.existsSync(lifeCycle + ".ts") &&
    !fs__default.existsSync(lifeCycle + ".js")
  )
    return;
  return getConfigWebpackConfig(
    "life-cycle",
    lifeCycle,
    this.setting.cache,
    this.config.src.SSR.base.webpack
  );
};

stuffConfig.call(
  context,
  {
    getDefaultBaseWebpackConfig: base.default,
    getDefaultClientWebpackConfig: client.default,
    getDefaultServerWebpackConfig: server.default
  },
  DEFAULT_PORT
);

stuffConfigByDll.call(
  context,
  {
    publicPath: "",
    all: [
      "Vue.dll.ba8b48d92c6d571ce0b4.js",
      "VueRouter.dll.6c1b719a2fbf024644e9.js",
      "Vuex.dll.c32572a2cbdef26c588b.js"
    ],
    initial: [
      "VueRouter.dll.6c1b719a2fbf024644e9.js",
      "Vuex.dll.c32572a2cbdef26c588b.js",
      "Vue.dll.ba8b48d92c6d571ce0b4.js"
    ],
    async: []
  },
  requireFromPath
);

stuffServer.call(context, merge);

delete context.config.src.SSR.base;

module.exports = { config: context.config, args, setting };
