// 包的初始化工作 init
// nrm 包管理器 方便切换各种源



// 全局安装包
// 创建bin配置
// #! /usr/bin/env  node
// npm link 添加到可执行目录



// 安装依赖
// dependency 项目依赖
// devDependency 开发环境依赖

// peerDependency 通常用在插件的开发中，插件需要某个依赖，但是又不需要安装它，声明一下所需要的这个依赖以及版本就好了。如果插件所需要的依赖没安装或者版本有问题就会报错提示。
// npm 3之前的版本会自动去安装依赖，npm以后不会再自动安装


// bundleDependency 打包依赖


// 版本问题
// major 大版本 破坏性、更新不向下兼容
// minor 小版本 新增功能
// patch 修订版本号 修复bug 小的更新

// 预览版 内部版本  alpha
// 公测版本 beta
// rc 最终测试版



// Script 脚本 shell
// 运行脚本问题
// npm run xx  会将xx放在bin 然后放在path 全局下
// npx xx  npm5.2以后提供的 npx 一次性的
//  可以下载包 运行 npx xxx  原理都是 下载完 放在bin 放在全局中




