/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50711
Source Host           : localhost:3306
Source Database       : center

Target Server Type    : MYSQL
Target Server Version : 50711
File Encoding         : 65001

Date: 2018-11-26 21:37:36
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for resources
-- ----------------------------
DROP TABLE IF EXISTS `resources`;
CREATE TABLE `resources` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `res_code` varchar(255) DEFAULT NULL,
  `res_type` varchar(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `path` varchar(255) DEFAULT NULL,
  `parent_id` int(11) NOT NULL,
  `var1` varchar(255) DEFAULT NULL,
  `var2` varchar(255) DEFAULT NULL,
  `var3` varchar(255) DEFAULT NULL,
  `is_deleted` int(11) DEFAULT '0',
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `delete_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of resources
-- ----------------------------
INSERT INTO `resources` VALUES ('1', '1', 'menu', 'app', '', '0', 'ha', 'ha', 'hh', '0', null, '2018-11-23 14:18:20', null);
INSERT INTO `resources` VALUES ('2', null, 'menu', '基础对象', null, '0', null, null, null, '0', '2018-11-14 23:34:30', null, null);
INSERT INTO `resources` VALUES ('3', null, 'menu', '客户', null, '2', null, null, null, '0', null, null, null);
INSERT INTO `resources` VALUES ('6', null, 'menu', '仓库', null, '2', null, null, null, '0', null, null, null);
INSERT INTO `resources` VALUES ('7', null, 'menu', '用户', '/user', '1', null, null, null, '0', null, '2018-11-23 14:13:26', null);
INSERT INTO `resources` VALUES ('8', null, 'menu', '用户登录', '/user/login', '7', null, null, null, '0', null, '2018-11-23 14:14:31', null);
INSERT INTO `resources` VALUES ('9', null, 'menu', '物料', null, '2', null, null, null, '0', null, null, null);
INSERT INTO `resources` VALUES ('10', null, 'menu', '供应商', null, '2', null, null, null, '0', null, null, null);
INSERT INTO `resources` VALUES ('11', null, 'menu', '费用', null, '2', null, null, null, '0', null, null, null);
INSERT INTO `resources` VALUES ('14', null, 'menu', '个人中心', '/account', '1', 'ha', 'ha', 'hh', '0', null, '2018-11-23 14:39:45', null);
INSERT INTO `resources` VALUES ('16', null, 'menu', '用户注册', '/user/register', '7', '', '', '', '0', '2018-11-23 14:23:17', null, null);
INSERT INTO `resources` VALUES ('17', null, 'menu', '用户注册结果', '/user/register-result', '7', '', '', '', '0', '2018-11-23 14:23:55', null, null);
INSERT INTO `resources` VALUES ('18', null, 'menu', '权限管理', '/permission', '1', '', '', '', '0', '2018-11-23 14:28:40', null, null);
INSERT INTO `resources` VALUES ('19', null, 'menu', '资源树', '/permission/resources/resources-tree.html', '18', '', '', '', '0', '2018-11-23 14:29:20', null, null);
INSERT INTO `resources` VALUES ('20', null, 'menu', '角色', '/permission/role-card-list', '18', '', '', '', '0', '2018-11-23 14:29:44', null, null);
INSERT INTO `resources` VALUES ('21', null, 'menu', '角色详情', '/permission/role-detail/:roleId', '18', '', '', '', '0', '2018-11-23 14:30:32', null, null);
INSERT INTO `resources` VALUES ('22', null, 'menu', '用户列表', '/permission/user-list', '18', '', '', '', '0', '2018-11-23 14:35:32', null, null);
INSERT INTO `resources` VALUES ('23', null, 'menu', '个人中心设置', '/account/center', '14', '', '', '', '0', '2018-11-23 14:40:32', null, null);
INSERT INTO `resources` VALUES ('24', null, 'menu', '结果页', '/result', '1', '', '', '', '0', '2018-11-23 14:41:29', null, null);
INSERT INTO `resources` VALUES ('25', null, 'menu', '成功页面', '/result/success', '24', '', '', '', '0', '2018-11-23 14:41:53', null, null);
INSERT INTO `resources` VALUES ('26', null, 'menu', '失败页面', '/result/fail', '24', '', '', '', '0', '2018-11-23 14:42:15', null, null);
INSERT INTO `resources` VALUES ('27', null, 'menu', '异常页面', '/exception', '1', '', '', '', '0', '2018-11-23 14:43:04', null, null);
INSERT INTO `resources` VALUES ('28', null, 'menu', '403', '', '27', '', '', '', '0', '2018-11-23 14:43:20', '2018-11-23 14:43:58', null);
INSERT INTO `resources` VALUES ('29', null, 'menu', '404', '/exception/404', '27', '', '', '', '0', '2018-11-23 14:43:45', null, null);
INSERT INTO `resources` VALUES ('30', null, 'menu', '500', '/exception/500', '27', '', '', '', '0', '2018-11-23 14:44:20', null, null);
INSERT INTO `resources` VALUES ('31', null, 'menu', '触发报错', '/exception/trigger', '27', '', '', '', '0', '2018-11-23 14:44:41', null, null);

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES ('1', 'admin', '系统管理员', '1', '2018-11-15 11:03:06');
INSERT INTO `role` VALUES ('2', 'Preshine', '平台工作人员', '1', '2018-11-15 11:10:10');
INSERT INTO `role` VALUES ('3', 'test', 'just for test ...', '0', '2018-11-15 11:29:15');
INSERT INTO `role` VALUES ('5', 'duoduoer', '哈哈哈哈啊哈哈', '1', '2018-11-15 18:36:54');
INSERT INTO `role` VALUES ('6', '哈哈哈', 'hahaha', '1', '2018-11-21 17:39:09');
INSERT INTO `role` VALUES ('7', '嗯呢', null, '0', '2018-11-21 17:40:32');
INSERT INTO `role` VALUES ('8', 'duoduoer1', '哈哈哈哈啊哈哈', '1', '2018-11-23 12:28:16');

-- ----------------------------
-- Table structure for role_res
-- ----------------------------
DROP TABLE IF EXISTS `role_res`;
CREATE TABLE `role_res` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) DEFAULT NULL,
  `res_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=157 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of role_res
-- ----------------------------
INSERT INTO `role_res` VALUES ('137', '1', '1');
INSERT INTO `role_res` VALUES ('138', '1', '7');
INSERT INTO `role_res` VALUES ('139', '1', '8');
INSERT INTO `role_res` VALUES ('140', '1', '16');
INSERT INTO `role_res` VALUES ('141', '1', '17');
INSERT INTO `role_res` VALUES ('142', '1', '14');
INSERT INTO `role_res` VALUES ('143', '1', '23');
INSERT INTO `role_res` VALUES ('144', '1', '18');
INSERT INTO `role_res` VALUES ('145', '1', '19');
INSERT INTO `role_res` VALUES ('146', '1', '20');
INSERT INTO `role_res` VALUES ('147', '1', '21');
INSERT INTO `role_res` VALUES ('148', '1', '22');
INSERT INTO `role_res` VALUES ('149', '1', '24');
INSERT INTO `role_res` VALUES ('150', '1', '25');
INSERT INTO `role_res` VALUES ('151', '1', '26');
INSERT INTO `role_res` VALUES ('152', '1', '27');
INSERT INTO `role_res` VALUES ('153', '1', '28');
INSERT INTO `role_res` VALUES ('154', '1', '29');
INSERT INTO `role_res` VALUES ('155', '1', '30');
INSERT INTO `role_res` VALUES ('156', '1', '31');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_account` int(11) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `real_name` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `sex` int(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  `is_delete` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '1', 'admin', null, '11', '450082119@qq.com', '123456', '2', null, null, '2018-11-21 16:14:48', '0', null, null, 'http://www.1lcj.com/static/resources/upload/image/20181122/1542849233354081608.jpg');
INSERT INTO `user` VALUES ('2', '2', 'preshine', null, '666', '666@qq.com', null, '2', null, null, '2018-11-21 16:14:51', '0', null, null, 'http://www.1lcj.com/static/resources/upload/image/20181122/1542849233354081608.jpg');
INSERT INTO `user` VALUES ('3', '3', '通天塔', null, '333', 'peixia_6766@163.com', null, '2', null, null, '2018-11-21 16:14:54', '0', null, null, 'http://www.1lcj.com/static/resources/upload/image/20181122/1542849233354081608.jpg');
INSERT INTO `user` VALUES ('4', '4', '嗯嗯嗯', null, '333', 'Preshine.6766@gamil.com', null, '2', null, null, '2018-11-21 16:14:57', '0', null, null, 'http://www.1lcj.com/static/resources/upload/image/20181122/1542849233354081608.jpg');
INSERT INTO `user` VALUES ('5', '5', 'admin1', null, '333', '79027068@qq.com', null, '2', null, null, '2018-11-12 16:15:00', '0', null, null, 'http://www.1lcj.com/static/resources/upload/image/20181122/1542849233354081608.jpg');
INSERT INTO `user` VALUES ('6', '6', 'lyfeng27@163.com', null, '33', '450082119@qq.com', null, '2', null, null, '2018-11-12 16:15:05', '0', null, null, 'http://www.1lcj.com/static/resources/upload/image/20181122/1542849233354081608.jpg');
INSERT INTO `user` VALUES ('7', '7', '333', null, '18565831876', '79027068@qq.com', null, '2', null, null, '2018-11-12 16:15:08', '0', null, null, 'http://www.1lcj.com/static/resources/upload/image/20181122/1542849233354081608.jpg');
INSERT INTO `user` VALUES ('8', '8', '333', null, '3', 'peixia_6766@163.com', null, '2', null, null, '2018-11-13 16:15:13', '0', null, null, 'http://www.1lcj.com/static/resources/upload/image/20181122/1542849233354081608.jpg');
INSERT INTO `user` VALUES ('9', '9', '333', null, '18565831876', 'peixia_6766@163.com', null, '2', null, null, '2018-11-06 16:15:17', '0', null, null, 'http://www.1lcj.com/static/resources/upload/image/20181122/1542849233354081608.jpg');
INSERT INTO `user` VALUES ('10', '10', '333', null, '33', 'peixia_6766@163.com', null, '2', null, null, '2018-11-06 16:15:21', '0', null, null, 'http://www.1lcj.com/static/resources/upload/image/20181122/1542849233354081608.jpg');
INSERT INTO `user` VALUES ('11', '11', '369', null, '3333', 'peixia_6766@163.com', null, '2', null, null, '2018-11-13 16:15:24', '0', null, null, 'http://www.1lcj.com/static/resources/upload/image/20181122/1542849233354081608.jpg');
INSERT INTO `user` VALUES ('12', '12', 'duoduo', null, '18565831876', 'lyfeng27@163.com', null, '2', null, null, '2018-11-21 16:41:01', '0', null, null, 'http://www.1lcj.com/static/resources/upload/image/20181122/1542849233354081608.jpg');
INSERT INTO `user` VALUES ('13', '13', 'tt', null, '18565831876', 'Preshine.6766@gamil.com', null, '2', null, null, '2018-11-21 16:41:05', '0', null, null, 'http://www.1lcj.com/static/resources/upload/image/20181122/1542849233354081608.jpg');
INSERT INTO `user` VALUES ('14', '14', 'dd', null, '18565831876', 'Preshine.6766@gamil.com', null, '2', null, null, '2018-11-21 16:18:18', '0', null, null, 'http://www.1lcj.com/static/resources/upload/image/20181122/1542849233354081608.jpg');

-- ----------------------------
-- Table structure for user_role
-- ----------------------------
DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_account` int(11) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_role
-- ----------------------------
INSERT INTO `user_role` VALUES ('10', '2', '1');
INSERT INTO `user_role` VALUES ('11', '3', '1');
INSERT INTO `user_role` VALUES ('12', '4', '1');
INSERT INTO `user_role` VALUES ('13', '6', '1');
INSERT INTO `user_role` VALUES ('14', '7', '1');
INSERT INTO `user_role` VALUES ('15', '5', '1');
INSERT INTO `user_role` VALUES ('16', '10', '1');
INSERT INTO `user_role` VALUES ('17', '9', '1');
INSERT INTO `user_role` VALUES ('18', '8', '1');
INSERT INTO `user_role` VALUES ('19', '11', '1');
INSERT INTO `user_role` VALUES ('20', '14', '2');
INSERT INTO `user_role` VALUES ('22', '14', '2');
INSERT INTO `user_role` VALUES ('23', '14', '1');
INSERT INTO `user_role` VALUES ('40', '1', '3');
INSERT INTO `user_role` VALUES ('41', '1', '1');
INSERT INTO `user_role` VALUES ('42', '1', '2');
INSERT INTO `user_role` VALUES ('43', '1', '6');
INSERT INTO `user_role` VALUES ('44', '1', '7');
INSERT INTO `user_role` VALUES ('45', '1', '5');
