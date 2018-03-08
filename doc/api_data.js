define({ "api": [  {    "group": "admin",    "type": "post",    "url": "/admin/login",    "title": "",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "name",            "description": "<p>用户名</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "password",            "description": "<p>用户密码</p>"          }        ]      }    },    "success": {      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n  \"data\": \"1\",\n  \"success\": true,\n  \"msg\": \"登录成功\",\n  \"token\": 'dsajkdhskadsa'\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "app/routes/mysql-admin.js",    "groupTitle": "admin",    "name": "PostAdminLogin"  },  {    "group": "admin",    "type": "post",    "url": "/admin/register",    "title": "",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "name",            "description": "<p>用户名</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "password",            "description": "<p>用户密码</p>"          }        ]      }    },    "success": {      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n  \"data\": \"1\",\n  \"success\": true,\n  \"msg\": \"注册成功\" \n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "app/routes/mysql-admin.js",    "groupTitle": "admin",    "name": "PostAdminRegister"  }] });
