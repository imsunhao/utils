import { TServerInjectContext } from '@web-steps/server'
import TerserPlugin from 'terser-webpack-plugin'
/**
 * 默认 启动端口
 */
export const DEFAULT_PORT = 8080

export const DEFAULT_INJECT_CONTEXT: TServerInjectContext = {
  SERVER_HOST: 'http://127.0.0.1:8080'
}

export const DEFAULT_OPENSSL_CONFIG = `
[ req ]
default_bits            = 2048
distinguished_name      = req_distinguished_name
default_md              = sha256
prompt                  = no

[ req_distinguished_name ]
countryName             = CN
stateOrProvinceName     = province
localityName            = locality
organizationName        = web-steps--self-signed
organizationalUnitName  = web-steps
`

export const DEFAULT_V3_EXT_CONFIG = `
authorityKeyIdentifier  = keyid,issuer
basicConstraints        = CA:FALSE
keyUsage                = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
subjectAltName          = @alt_names

[alt_names]
DNS.1                   = localhost
IP.1                    = 127.0.0.1
`

export const HTTPS_README = (ca: string, cert: string) => `
## mac 系统
\`\`\`
sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain ${ca}
sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain ${cert}
open /Library/Keychains/System.keychain
\`\`\`
然后 找到 标红的 web-steps 证书, 双击打开 找到 详细. 始终信任
`

export const TERSER_PLUGIN_OPTIONS: TerserPlugin.TerserPluginOptions = {
  exclude: /\.min\.js$/,
  parallel: true,
  extractComments: false,
  sourceMap: false
}

export const DEFAULT_TEMPLATE = `
<!DOCTYPE html>
<html>
  <head>
    <title>{{ pageInfo.title }}</title>
    <meta name="keywords" content="{{ pageInfo.keywords }}">
    <meta name="description" content="{{ pageInfo.description }}">
  </head>

  <body>
    <!--vue-ssr-outlet-->
  </body>
</html>
`

export const COMMON_HELPER_INFO = `
- COMMON
  root-dir:              根目录路径 string
  inject-context:        注入自定义数据路径 string
  setting-path:           web-steps 配置文件路径 string
                         - 文件类型为 JSON 类型, 例如 web-steps.json
                         - 详情查看 web-steps config --helper
`
export const DEFAULT_HELPER_INFO = `
${COMMON_HELPER_INFO}
- MAJOR_COMMAND_LIST
  build:                 编译代码
  config:                配置文件
  dev:                   开发模式启动
  start:                 启动已经编译完成的代码
  pre:                   预编译
  download:              下载代码
  release:               发布版本
`
