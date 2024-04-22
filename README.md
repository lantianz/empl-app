# empl-app-web-front

## 项目介绍

该项目是针对某高校的就业管理系统，采用前后端分离的方式，前端使用Vue2框架，后端使用SpringBoot框架。

前端页面采用ElementUI组件库，后端使用MyBatis-Plus框架，数据库采用MySQL。


## 项目运行

1. 克隆项目到本地

```
git clone https://github.com/lantianz/empl-app-web-front.git
```

2. 安装依赖

```
npm install
```

3. 运行项目

```
npm run serve
```

4. 打包项目

```
npm run build
```


## **1.1** 管理员登录功能

管理员通过浏览器进入管理系统的登录页面，输入账号密码，点击登录后，进入到管理系统首页，展示相应的管理员可操作的菜单。登录页如下图1所示，系统总管理员和各院系就业工作负责人首页分别如下图2、3所示。

![img](https://github.com/lantianz/empl-app-web-front/raw/main/introduce-img/img (1).jpg) 

图 1 管理员登录页

 

![img](https://github.com/lantianz/empl-app-web-front/raw/main/introduce-img/img (2).jpg) 

图 2 系统总管理员首页

 

![img](https://github.com/lantianz/empl-app-web-front/raw/main/introduce-img/img (3).jpg) 

图 3 各院系就业工作负责人首页

 

登录时，系统会先对输入表单进行校验，确认账号密码合理；点击登录按钮后，系统向后端发送登录请求，后端接收账号密码后通过与数据库中的信息进行对比验证，确认无误后将token存入Redis并返回前端对应的管理员权限菜单以及token，前端接收后存入本地浏览器的localStorage，登录完成，若信息错误，则登录失败。相关代码如下图4、5所示。

![img](https://github.com/lantianz/empl-app-web-front/raw/main/introduce-img/img (4).jpg) 

图 4 登录按钮方法

 

![img](https://github.com/lantianz/empl-app-web-front/raw/main/introduce-img/img (5).jpg) 

图 5 token数据生成并返回

 

## **1.2** 毕业生基本信息管理功能

相应权限管理员成功登录后，点击侧栏菜单中的毕业生基本信息跳转至对应页面，页面实现管理员对毕业生基本信息的新增、查找、编辑、删除等操作；新增和编辑采用同一个对话框，不同显示内容实现界面。部分功能页面如下图6、7、8所示。前端页面代码结构如下图9所示。

![img](https://github.com/lantianz/empl-app-web-front/raw/main/introduce-img/img (6).jpg) 

图 6 新增毕业生基本信息

![img](https://github.com/lantianz/empl-app-web-front/raw/main/introduce-img/img (7).jpg) 

图 7 编辑毕业生基本信息

 

![img](https://github.com/lantianz/empl-app-web-front/raw/main/introduce-img/img (8).jpg) 

图 8 查找毕业生基本信息

 

![img](https://github.com/lantianz/empl-app-web-front/raw/main/introduce-img/img (9).jpg) 

图 9 毕业生基本信息页面代码结构

 

## **1.3** 毕业生就业信息管理功能

相应权限管理员成功登录后，点击侧栏菜单中的毕业生就业信息跳转至对应页面，页面实现管理员对毕业生就业信息的新增、查找、编辑、删除以及批量删除等操作；新增和编辑采用同一个对话框，不同显示内容实现界面。部分功能页面如下图10、11、12所示。前端页面代码结构如下图13所示。

![img](https://github.com/lantianz/empl-app-web-front/raw/main/introduce-img/img (10).jpg) 

图 10 新增毕业生就业信息

 

![img](https://github.com/lantianz/empl-app-web-front/raw/main/introduce-img/img (11).jpg) 

图 11 编辑毕业生就业信息

 

![img](https://github.com/lantianz/empl-app-web-front/raw/main/introduce-img/img (12).jpg) 

图 12 查找毕业生就业信息

 

![img](https://github.com/lantianz/empl-app-web-front/raw/main/introduce-img/img (13).jpg) 

图 13 毕业生就业信息页面代码结构

 

## **1.4** 院系负责人信息管理功能

相应权限管理员成功登录后，点击侧栏菜单中的院系负责人信息跳转至对应页面，页面实现对院系负责人的新增、查找、编辑、删除、批量删除等操作；新增和编辑采用同一个对话框，不同显示内容实现界面。部分功能页面如下图14、15、16所示。前端页面代码结构如下图17所示。

![img](https://github.com/lantianz/empl-app-web-front/raw/main/introduce-img/img (14).jpg) 

图 14 添加院系负责人信息

 

![img](https://github.com/lantianz/empl-app-web-front/raw/main/introduce-img/img (15).jpg) 

图 15 编辑院系负责人信息

 

![img](https://github.com/lantianz/empl-app-web-front/raw/main/introduce-img/img (16).jpg) 

图 16 批量删除院系负责人信息

 

![img](https://github.com/lantianz/empl-app-web-front/raw/main/introduce-img/img (17).jpg) 

图 17 院系负责人信息页面代码结构

 

## **1.5** 分配毕业生初始账号和密码功能

相应权限管理员成功登录后，点击侧栏菜单中的初始账号分配跳转至对应页面，选择相应院系后，页面实现管理员对毕业生初始账号的分配操作。部分功能页面如下图18所示。前端页面代码结构如下图19所示。

![img](https://github.com/lantianz/empl-app-web-front/raw/main/introduce-img/img (18).jpg) 

图 18 初始账号分配页面

 

![img](https://github.com/lantianz/empl-app-web-front/raw/main/introduce-img/img (19).jpg) 

图 19 初始账号分配页面代码结构

 

## **1.6** 就业相关资讯推送功能

相应权限管理员成功登录后，点击侧栏菜单中的就业相关资讯推送跳转至对应页面，页面实现管理员对就业相关资讯的推送等操作；新增和编辑采用同一个对话框，不同显示内容实现界面。部分功能页面如下图20、21、22、23所示。前端页面代码结构如下图24所示。

![img](https://github.com/lantianz/empl-app-web-front/raw/main/introduce-img/img (20).jpg) 

图 20 就业相关资讯推送页面

 

![img](https://github.com/lantianz/empl-app-web-front/raw/main/introduce-img/img (21).jpg) 

图 21 新增就业相关资讯

 

![img](https://github.com/lantianz/empl-app-web-front/raw/main/introduce-img/img (22).jpg) 

图 22 编辑就业相关资讯

 

![img](https://github.com/lantianz/empl-app-web-front/raw/main/introduce-img/img (23).jpg) 

图 23 就业资讯预览查看

 

![img](https://github.com/lantianz/empl-app-web-front/raw/main/introduce-img/img (24).jpg) 

图 24 就业相关资讯推送页面代码结构

 

## **1.7** 就业信息审核功能

相应权限管理员成功登录后，点击侧栏菜单中的就业信息审核跳转至对应页面，页面实现管理员对毕业生上报的就业信息进行审核操作。部分功能页面如下图25所示。前端页面代码结构如下图26所示。

![img](https://github.com/lantianz/empl-app-web-front/raw/main/introduce-img/img (25).jpg) 

图 25 就业信息审核页面

 

![img](https://github.com/lantianz/empl-app-web-front/raw/main/introduce-img/img (26).jpg) 

图 26 就业信息审核页面代码结构

 

## **1.8** 汇总与统计功能

相应权限管理员成功登录后，点击侧栏菜单中的汇总与统计，菜单栏展开后有5个相应功能，分别是：

(1) 按院系生成某届毕业生就业信息一览表；

(2) 按专业生成某院系某届毕业生就业信息一览表；

(3) 按签约单位类别生成某院系某届毕业生就业信息统计表；

(4) 按签约单位所在省市生成某院系某届毕业生就业信息统计表；

(5) 生成某学院某届毕业生按时就业和毕业后两年内就业情况统计表。

其中系统总管理员拥有全部5项功能的管理权限，各院系就业工作负责人拥有除了(1)以外全部功能的管理权限；在登录之后页面显示也会不同。

再次点击相应菜单跳转至对应功能页面，页面实现展示汇总统计后对应的表。

部分功能页面如下图27、28、29、30、31所示。

![img](https://github.com/lantianz/empl-app-web-front/raw/main/introduce-img/img (27).jpg) 

图 27 按院系生成某届毕业生就业信息一览表

 

![img](https://github.com/lantianz/empl-app-web-front/raw/main/introduce-img/img (28).jpg) 

图 28 按专业生成某院系某届毕业生就业信息一览表

 

![img](https://github.com/lantianz/empl-app-web-front/raw/main/introduce-img/img (29).jpg) 

图 29 按签约单位类别生成某院系某届毕业生就业信息统计表

 

![img](https://github.com/lantianz/empl-app-web-front/raw/main/introduce-img/img (30).jpg) 

图 30 按签约单位所在省市生成某院系某届毕业生就业信息统计表

 

![img](https://github.com/lantianz/empl-app-web-front/raw/main/introduce-img/img (31).jpg) 

图 31 生成某学院某届毕业生按时就业和毕业后两年内就业情况统计表

 

## **1.9** 个人中心、更改密码、注销功能

管理员成功登录后，点击侧栏菜单中其他中或右上角头像的下拉栏的个人中心即可进入个人中心页面，如下图32所示。更改密码功能和注销功能也在右上角头像的下拉栏中；更改密码功能如下图33所示。注销后将清除localStorage中的token以及各项信息退回到登录页面。

![img](https://github.com/lantianz/empl-app-web-front/raw/main/introduce-img/img (32).jpg) 

图 32 个人中心页面

 

![img](https://github.com/lantianz/empl-app-web-front/raw/main/introduce-img/img (33).jpg) 

图 33 更改密码页面

