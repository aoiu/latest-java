# latest-java
[![NPM version](https://img.shields.io/npm/v/dong.svg?style=flat-square)](https://npmjs.org/package/latest-java)
> 从admin-develop更新java，再重新修改配置

## 前置条件
环境变量PATH中有svn.exe所在目录，确保svn命令行可以正常使用

## 使用方法

### 安装
```bash
$ npm install -g latest-java
```

### 配置config.json
在webapp目录下新建config.json，内容示例如下
```bash
{
	"WebApplication.java": {
  		"path": "../java/com/nd/admin/app/",
  		"replace": {
  			"getRealm": {
	  			"from": "admin-develop.sdp.nd",
	  			"to": "sample.sdp.nd"
  			}
  		}
	},

	"AdminProperties.java": {
  		"path": "../java/com/nd/admin/config/",
  		"replace": {
  			"ADMIN_TARGET_URI_DEFAULT_VALUE": {
	  			"from": "http://microblog.dev.web.nd/v0.1/",
	  			"to": "http://sample.dev.web.nd/v0.1/"
  			}
  		}
	}
}
```

### 进入webapp目录（与dong一致）
```bash
$ latest-java
```
