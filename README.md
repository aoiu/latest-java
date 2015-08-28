# latest-java
[![NPM version](https://img.shields.io/npm/v/dong.svg?style=flat-square)](https://npmjs.org/package/latest-java)
> 从admin-develop更新java和filters部分，再根据config.json重新修改配置

## 前置条件
环境变量PATH中有svn.exe所在目录，确保svn命令行可以正常使用

## 使用方法

### 安装
```bash
$ npm install -g latest-java
```

### 配置config.json
在webapp目录下新建config.json文件，内容示例如下，
> java文件使用replace方式将寻找原内容替换，properties文件使用direct方式将寻找匹配的属性重写内容
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
	},

  "filter-development.properties": {
      "path": "../filters/",
      "direct": {
        "mongodb.replsetserver": "172.24.133.23:34001,172.24.133.24:34001,172.24.133.25:34001",
        "mongodb.dbName": "dev_mdb_sample",
        "mongodb.username": "dev_mdb_sample",
        "mongodb.password": "sample",
        "admin.target.uri": "http://sample.dev.web.nd/v0.1/"
      }
  },

  "filter-preproduction.properties": {
      "path": "../filters/",
      "direct": {
        "mongodb.replsetserver": "m1.social.pre-prod.mongod.sdp:34001,m2.social.pre-prod.mongod.sdp:34001,m3.social.pre-prod.mongod.sdp:34001",
        "mongodb.dbName": "preproduction_mdb_sample",
        "mongodb.username": "preproduction_mdb_sample",
        "mongodb.password": "sample",
        "admin.target.uri": "http://sample.beta.web.sdp.101.com/v0.1/"
      }
  },

  "filter-pressure.properties": {
      "path": "../filters/",
      "direct": {
        "mongodb.replsetserver": "61.160.40.213:34001",
        "mongodb.dbName": "pressure_mdb_sample",
        "mongodb.username": "pressure_mdb_sample",
        "mongodb.password": "sample",
        "admin.target.uri": "http://sample.qa.web.sdp.101.com/v0.1/"
      }
  },

  "filter-product.properties": {
      "path": "../filters/",
      "direct": {
        "mongodb.replsetserver": "m1.social.prod.mongod.sdp:34001,m2.social.prod.mongod.sdp:34001,m3.social.prod.mongod.sdp:34001",
        "mongodb.dbName": "sample",
        "mongodb.username": "sample",
        "mongodb.password": "sample",
        "admin.target.uri": "http://sample.web.sdp.101.com/v0.1/"
      }
  },

  "filter-test.properties": {
      "path": "../filters/",
      "direct": {
        "mongodb.replsetserver": "172.24.133.60:34001,172.24.133.61:34001,172.24.133.62:34001",
        "mongodb.dbName": "qa_mdb_sample",
        "mongodb.username": "qa_mdb_sample",
        "mongodb.password": "sample",
        "admin.target.uri": "http://sample.debug.web.nd/v0.1/"
      }
  }
}
```

### 进入webapp目录（与dong一致）
```bash
$ latest-java
```
程序将删除java和filters目录，重新从admin-develop的svn中导出java和filters，再根据config.json替换指定内容
