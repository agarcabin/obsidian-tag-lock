# Tag Lock

Tag Lock is a lightweight Obsidian plugin for protecting notes from casual viewing on a shared phone. It does not encrypt local Markdown files; it adds a password gate inside Obsidian.

Tag Lock 是一个轻量级 Obsidian 插件，主要用于防止别人直接通过手机 Obsidian 翻看隐私内容。它不加密本地 Markdown 文件，而是在 Obsidian 内增加密码保护。

## Default settings / 默认设置

- Protected tags / 受保护标签: `#隐私`, `#密码`
- Protected folders / 受保护文件夹: empty / 空
- Protect tag-named wikilinks / 标签同名双链保护: on / 开启
- Unlock duration / 解锁有效时长: 30 minutes / 30 分钟
- Lock immediately after restart / 重启后立即锁定: on / 开启
- Lock when app goes to background / 切后台后立即锁定: off / 关闭
- Protect search / 搜索保护: on / 开启
- Protect page previews and backlinks / 页面预览及反链保护: on / 开启
- Protect tag-named pages / 标签同名页面保护: on / 开启
- Protect Tag Lock settings / Tag Lock 设置页面保护: off / 关闭
- Require a password on every access / 强制每次访问都需要密码: off / 关闭
- Unlock immediately when correct / 密码正确后立即解锁: on / 开启
- Wrong password or cancel / 密码错误或取消后: go to previous page / 跳转到上一个页面
- Immediate unlock / 密码正确后立即解锁
- Five consecutive failures lock input for 30 seconds / 连续错误 5 次后暂停输入 30 秒

The settings page supports automatic system language, Chinese, and English.

设置页支持自动跟随系统、中文和 English。

Search and backlinks protection observe Obsidian views in the plugin. View DOM details may require further adaptation across Obsidian versions.

搜索和反链保护通过观察 Obsidian 视图实现。不同 Obsidian 版本的视图 DOM 结构可能需要继续适配。
