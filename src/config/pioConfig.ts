import type { PioConfig } from "../types/config";

// Pio 看板娘配置
export const pioConfig: PioConfig = {
	enable: false, // 启用看板娘
	models: ["/pio/models/NOIR/noir.model3.json"], // 默认模型路径
	position: "left", // 模型位置
	width: 280, // 默认宽度
	height: 250, // 默认高度
	mode: "draggable", // 默认为可拖拽模式
	hiddenOnMobile: true, // 默认在移动设备上隐藏
	hideAboutMenu: false, // 隐藏内置 About 菜单按钮
	dialog: {
		welcome: "欢迎来到GINA的秘密花园~", // 欢迎词
		touch: [
			"你在干什么？",
			"不要摸我",
			"嘿!",
			"Are you Ok?",
		], // 触摸提示
		home: "点击回到首页", // 首页提示
		skin: ["你想我换装吗？", "这服装真好看"], // 换装提示
		close: "下次见", // 关闭提示
		link: "https://github.com/LyraVoid/Mizuki", // 关于链接
	},
};
