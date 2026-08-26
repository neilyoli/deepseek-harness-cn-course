# 自己研究一个陌生模块的方法

后半程遇到新模块，按这个顺序走。

```text
1. 先判断问题属于哪个 subsystem
2. Reference 首页找到 owning page
3. 找 Package README，读 contract / limitations / extension points
4. 找 Service Definition
5. 找 Provider
6. 找 Consumer
7. 找 Event producer / consumer
8. 找 tests，尤其 failure / cancel / dispose
9. 从入口追调用链
10. 最后才形成自己的解释
```

## 搜索问题，而不是搜索名词

差的搜索：`grep -R Session`。

更好的问题：

- 谁 `new` / `provide` 这个 Service？
- 谁 inject 这个 key？
- 哪个事件把 live state 写成 durable fact？
- cleanup 被谁拥有？
- 哪个 test 证明 provider disappearance 的行为？

## Source Reading Card

重要机制至少能填出：

| 项 | 你的答案 |
|---|---|
| owning subsystem | |
| package / README | |
| entry | |
| contract type | |
| provider | |
| consumers | |
| state mutation | |
| lifecycle owner | |
| events | |
| tests | |
| plugin extension point | |

填不出来的格子，就是下一步该查的东西。
