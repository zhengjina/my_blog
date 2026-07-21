// 日记数据配置
// 用于管理日记页面的数据

export interface DiaryItem {
	id: number;
	content: string;
	date: string;
	images?: string[];
	location?: string;
	mood?: string;
	tags?: string[];
}

// 示例日记数据
const diaryData: DiaryItem[] = [
	{
		id: 1,
		content:
			"The falling speed of cherry blossoms is five centimeters per second!",
		date: "2025-01-15T10:30:00Z",
		images: ["/images/diary/sakura.jpg", "/images/diary/1.webp"],
	},
	{
    id: 3, // 新的ID
    content: "今天尝试了新的咖啡配方，味道很棒！绵密的奶泡是关键。", // 内容，使用换行
    date: "2025-01-20T15:00:00Z", // 新的日期
    images: ["/images/diary/coffee.jpg"], // 新的图片路径
  },
];

// 获取日记列表（按时间倒序）
export const getDiaryList = (limit?: number) => {
	const sortedData = [...diaryData].sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
	);

	if (limit && limit > 0) {
		return sortedData.slice(0, limit);
	}

	return sortedData;
};

// 获取所有标签
export const getAllTags = () => {
	const tags = new Set<string>();
	for (const item of diaryData) {
		if (item.tags) {
			for (const tag of item.tags) {
				tags.add(tag);
			}
		}
	}
	return Array.from(tags).sort();
};
