[English](#english) | [简体中文](#简体中文)

# Tag Lock

## English

## When your notes are personal, opening Obsidian should not expose everything

An Obsidian vault often contains much more than ordinary notes: private diary entries, relationship records, passwords, health details, financial thoughts, and unfinished ideas. The problem is not always a sophisticated attacker. Sometimes you simply hand your phone to a family member, colleague, or friend, and they open Obsidian out of curiosity. A normal page switch, search, preview, or backlink panel can reveal information before you have time to react.

Tag Lock adds a lightweight privacy gate inside Obsidian. Mark a note with a protected tag such as `#隐私` or `#password`, and Tag Lock asks for verification before the protected content is shown. It is designed for the everyday “防君子” scenario: reducing accidental or curious viewing on a shared device without changing the Markdown files in your vault.

## What makes Tag Lock different

### Protect a page with a simple tag

Add a protected tag anywhere in a note:

```markdown
Today I wrote something private. #隐私
```

You can configure multiple tags, one per line. This makes protection quick enough for diary writing, while still allowing you to organize different kinds of sensitive notes with tags such as `#隐私`, `#保密`, `#密码`, or `#medical`.

### Protect more than direct page opening

Tag Lock checks several ways in which private information can appear:

- Opening a protected Markdown page.
- Searching for protected files. Search results remain visible, but a protected result triggers verification and is blocked after an unsuccessful or cancelled attempt.
- Rendering protected page previews.
- Showing protected pages in backlinks panels.
- Linking to a tag-named page, such as `[[隐私]]`, when tag-named wikilink protection is enabled.
- Opening a page whose filename matches a protected tag, such as `隐私.md`, when tag-named page protection is enabled.
- Accessing files inside configured protected folders.

This distinction matters: protection is applied at the points where content could be exposed, not only after the note has already been opened.

### Password or Android-style pattern unlock

Choose the unlock method that feels natural for your device:

- Password unlock.
- Nine-dot pattern gesture, similar to Android screen unlock.

The first credential setup dialog lets you switch between the two methods before saving. You can also change the credential later, reset both credentials, add a password hint, and choose whether a correct credential unlocks immediately or waits for the Unlock button.

### Practical lock behavior for shared devices

Tag Lock includes controls for the moments when privacy is most likely to be lost:

- Set how long an unlock remains valid. `0` keeps it valid for the current Obsidian session.
- Lock when Obsidian moves to the background.
- Lock again after restarting Obsidian.
- Require verification on every access, even when an earlier unlock is still valid.
- After five consecutive failed attempts, pause credential input for 30 seconds.
- If the unlock prompt is opened three times within one second, close the current tab. This helps prevent repeated prompt loops caused by rapid navigation or view refreshes.
- Choose what happens after a wrong credential or cancellation: return to the previous page, close the current tab, or take no navigation action.

### Preview masking is a real visual barrier

Protected previews are covered with an opaque overlay and a blur effect. The content is not merely dimmed. The overlay is placed above the rendered preview, and it is removed after successful verification. The same protection model is used for backlinks previews so that sensitive text is not readable while browsing related notes.

### Settings can be protected too

If enabled, the Tag Lock settings page itself requires verification. This prevents someone who can access your Obsidian settings from simply disabling the protection rules or changing the credentials.

Tag Lock requires Obsidian 1.13.0 or later. It exposes its settings through Obsidian's declarative settings API, so settings can be found using the settings search.

## Default protection rules

The first-use defaults are:

- Protected tags: `#隐私` and `#密码`.
- Protected folders: none.
- Tag-named wikilink protection: enabled.
- Tag-named page protection: enabled.
- Search protection: enabled.
- Page preview and backlinks protection: enabled.
- Tag Lock settings protection: disabled.
- Unlock method: password.
- Unlock validity: 30 minutes.
- Lock after restart: enabled.
- Lock when entering the background: disabled.
- Require verification on every access: disabled.
- Immediate unlock after a correct credential: enabled.
- Failed or cancelled verification: go to the previous page.

All of these settings can be changed in Tag Lock settings. The protected tag and folder fields accept one entry per line.

## Installation

### From a GitHub Release

Download `main.js`, `manifest.json`, and `styles.css` from the [latest release](https://github.com/agarcabin/obsidian-tag-lock/releases/latest), then copy them into:

```text
<your-vault>/.obsidian/plugins/tag-lock/
```

Enable **Tag Lock** in Obsidian's Community plugins settings.

### Manual development installation

Clone the repository, install the development dependencies, and build the plugin:

```bash
npm install
npm run build
```

Copy the generated `main.js`, `manifest.json`, and `styles.css` into the plugin directory above, then reload Obsidian.

## Privacy and security scope

Tag Lock does not encrypt or rewrite local Markdown files. Protected text remains readable to anyone who opens the files outside Obsidian, uses another tool, accesses the vault directly, or inspects an already unlocked Obsidian session. The credentials are stored as salted hashes for verification; this plugin is not intended to replace full-disk encryption, vault encryption, operating-system authentication, or a threat model involving an attacker with filesystem access.

Use Tag Lock when the main risk is casual viewing on your phone or a shared computer. Use real encryption when the notes must remain protected even if the vault files are copied.

## License

Tag Lock is released under the [MIT License](LICENSE).

# 简体中文

## 日记和隐私笔记，不应该因为别人打开 Obsidian 就全部暴露

很多人的 Obsidian 库里不只有普通笔记，还会记录私人日记、感情经历、健康情况、财务想法、密码提示和没有整理完的敏感内容。真正常见的风险，往往不是黑客攻击，而是把手机借给家人、同事或朋友时，对方顺手打开了 Obsidian。

如果没有额外保护，对方可能通过打开页面、搜索关键词、查看反链或浏览预览，在你反应过来之前看到不想公开的内容。

Tag Lock 在 Obsidian 内增加了一层轻量级隐私验证。只要页面中出现受保护标签，访问可能暴露内容的位置时就会先要求密码或九宫格手势。它主要解决的是日常使用中的“防君子”场景：防止别人使用你的手机或电脑时随意看到隐私笔记，同时不改写本地 Markdown 文本。

## Tag Lock 的特殊之处

### 写完隐私内容，末尾加一个标签就可以保护

在页面任意位置添加受保护标签即可：

```markdown
今天记录了一些不想让别人看到的事情。 #隐私
```

受保护标签支持自定义，每行一个。例如可以配置：

```text
#隐私
#保密
#密码
#医疗
```

这样写日记时只需要在最后加上一个标签，不需要移动文件，也不需要把内容放进特殊格式里。

### 不只保护“打开页面”这一种行为

Tag Lock 会检查隐私内容可能被看到的多个入口：

- 打开受保护的 Markdown 页面。
- 搜索受保护文件。搜索结果不会直接隐藏，但搜索到受保护文件时会触发密码验证；验证错误或取消后，可以阻止该结果继续显示内容。
- 渲染受保护页面预览。
- 在反链面板中显示受保护页面的预览。
- 页面中写有 `[[隐私]]` 这样的标签同名双链时进行保护。
- 文件名等于受保护标签时进行保护，例如 `隐私.md`。
- 访问受保护文件夹下的文件。

这意味着保护不是等到页面已经打开后才补救，而是覆盖页面打开、搜索、预览、反链和双链等容易泄露内容的入口。

### 密码和安卓风格九宫格手势都支持

可以按照设备和个人习惯选择解锁方式：

- 普通密码。
- 类似安卓手机解锁的九宫格手势。

第一次设置凭据时，就可以在密码和九宫格手势之间切换。之后可以在设置中修改当前凭据、重置所有凭据、设置密码提示词，并选择密码正确后是否立即解锁。

### 针对手机借用场景设计的锁定规则

Tag Lock 提供了较细的锁定控制：

- 设置解锁有效时长。设置为 `0` 时，本次 Obsidian 运行期间不会自动过期。
- Obsidian 切到后台后立即锁定。
- 重启 Obsidian 后立即锁定。
- 强制每次访问都需要验证，即使之前的解锁仍在有效期内。
- 连续输错 5 次后，暂停密码输入 30 秒。
- 1 秒内连续弹出 3 次密码框时，自动关闭当前标签页，防止页面刷新或快速导航导致密码框循环弹出。
- 密码错误或取消后，可以选择跳转到上一个页面、关闭当前页面，或者不执行导航动作。

### 受保护预览使用遮罩和模糊，不只是降低亮度

受保护的页面预览会覆盖不透明遮罩，并对预览内容应用模糊效果。它不是简单地把文字颜色变暗，而是在渲染内容上方放置保护层，避免旁边的人直接读出文字。输入正确密码后，遮罩和模糊会被移除，预览恢复正常。

反链预览也采用同样的保护方式，防止通过相关页面列表间接看到隐私内容。

### 设置页面本身也可以保护

开启“Tag Lock 设置页面保护”后，进入插件设置也需要验证。这样别人即使能打开 Obsidian 设置，也不能直接关闭保护规则、修改锁定策略或更换凭据。

Tag Lock 要求 Obsidian 1.13.0 或更高版本，并使用 Obsidian 的声明式设置接口，因此设置项目可以通过设置页面的搜索功能查找。

## 首次使用默认设置

第一次使用插件时，默认设置如下：

- 受保护标签：`#隐私`、`#密码`。
- 受保护文件夹：空。
- 标签同名双链保护：开启。
- 标签同名页面保护：开启。
- 搜索保护：开启。
- 页面预览及反链保护：开启。
- Tag Lock 设置页面保护：关闭。
- 解锁方式：密码。
- 解锁有效时长：30 分钟。
- 重启后立即锁定：开启。
- 切后台立即锁定：关闭。
- 强制每次访问都需要密码：关闭。
- 密码正确后立即解锁：开启。
- 密码错误或取消后：跳转到上一个页面。

所有设置都可以在 Tag Lock 设置页面中修改。受保护标签和受保护文件夹均为每行一个项目。

## 安装方法

### 从 GitHub Release 安装

从[最新 Release](https://github.com/agarcabin/obsidian-tag-lock/releases/latest) 下载 `main.js`、`manifest.json` 和 `styles.css`，将它们复制到：

```text
<你的 Obsidian 库>/.obsidian/plugins/tag-lock/
```

然后在 Obsidian 的“社区插件”设置中启用 **Tag Lock**。

### 手动构建开发版

克隆仓库、安装依赖并构建插件：

```bash
npm install
npm run build
```

将生成的 `main.js`、`manifest.json` 和 `styles.css` 复制到上面的插件目录，然后重载 Obsidian。

## 隐私和安全边界

Tag Lock 不会加密或改写本地 Markdown 文件。只要有人绕过 Obsidian，直接打开文件、复制库文件、使用其他软件读取，或者在 Obsidian 中已经处于解锁状态，就仍然可能看到受保护内容。密码和手势凭据以带盐哈希形式保存用于验证；本插件不能替代全盘加密、操作系统锁屏、真正的加密笔记库，也不针对已经取得文件访问权限的攻击者。

如果你的主要担心是手机或电脑借给别人时被随手翻看，Tag Lock 可以提供方便的额外防护。如果笔记即使被复制到其他设备也必须保持机密，应使用真正的文件或数据库加密方案。

## 开源协议

Tag Lock 使用 [MIT License](LICENSE) 开源。
