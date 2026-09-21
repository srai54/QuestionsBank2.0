# Question list: batch 003

Questions 1,001–1,500: web foundations, React and Angular, JavaScript and
TypeScript, algorithms, data engineering, and AI evaluation.
Question prompts only; answers are not included. These prompts are individually
written and checked against the other files in this restarted list.

## HTML, CSS, browser behavior, and accessibility

1001. How does semantic HTML improve navigation when a page's visual styling is unavailable?
1002. When should an interactive element be a button rather than a link?
1003. Why does adding a click handler to a div not reproduce native button behavior?
1004. How would you choose heading levels from document structure rather than desired font size?
1005. What distinguishes an input's accessible name from its placeholder text?
1006. How should a form associate a validation error with the field that caused it?
1007. When would a fieldset and legend clarify the relationship between several inputs?
1008. Why can duplicate HTML IDs break labels, navigation, and assistive-technology relationships?
1009. How would you expose a required field without relying solely on a colored asterisk?
1010. What behavior does a disabled form control have that a readonly control does not?
1011. How would you preserve form usability when JavaScript fails to initialize?
1012. What distinguishes browser constraint validation from server-side business validation?
1013. How should autocomplete attributes express the meaning of identity and address fields?
1014. Why can preventing paste in password fields harm both usability and security?
1015. How would you make a custom checkbox expose state and keyboard interaction correctly?
1016. When is native disclosure markup preferable to a manually scripted expand-collapse widget?
1017. What should alternative text communicate for a functional image used as a control?
1018. When should an image have empty alternative text rather than a descriptive sentence?
1019. How would you provide an accessible equivalent for information encoded only in a chart?
1020. What distinguishes a decorative icon from an icon that requires an accessible name?
1021. How would a screen-reader user navigate a table with multiple header levels?
1022. Why should layout tables be distinguished from tables representing relationships in data?
1023. How would you expose a sortable table column's current ordering state?
1024. What should users hear when a live region announces an asynchronous update?
1025. How do polite and assertive announcements differ in their impact on current speech?
1026. Why can frequent live-region updates make a page unusable despite technically exposing all changes?
1027. How would you provide a skip link that works for keyboard users and becomes visible on focus?
1028. What makes a focus indicator useful against both light and dark backgrounds?
1029. How can positive tabindex values make keyboard navigation harder to maintain?
1030. What should happen to focus when a focused element is removed from the document?
1031. How would you prevent a sticky header from obscuring an anchor target or focused control?
1032. What interaction alternatives should accompany drag-and-drop functionality?
1033. How would you make a tooltip's content available without requiring pointer hover?
1034. Why does visual order created with CSS not necessarily change reading or tab order?
1035. How would you test a page at high zoom without assuming a fixed viewport width?
1036. What should a reduced-motion preference change in a decorative animation?
1037. How can an animation interfere with users even when it does not cause layout shifts?
1038. What distinguishes color contrast from using color as the only carrier of meaning?
1039. How would you present input errors so users can find both the summary and each affected field?
1040. Why should an infinite-scrolling interface provide a predictable way to reach footer content?
1041. How does the CSS box-sizing property change width calculations?
1042. When can vertical margins collapse, and what layout surprises can that cause?
1043. How do min-width and min-height interact with shrinking flex children?
1044. Why can an overflowing flex item require min-width: 0 rather than a narrower width?
1045. How would you choose CSS Grid instead of Flexbox for a two-dimensional arrangement?
1046. What does an implicit grid track add when content exceeds explicitly declared tracks?
1047. How do auto-fit and auto-fill differ when a grid has spare column space?
1048. When can a fractional grid track still overflow because of its minimum content size?
1049. How would you lay out a sidebar that grows to content while the main panel takes remaining space?
1050. What is the difference between a layout viewport and the visible viewport on mobile devices?
1051. How can dynamic browser chrome affect layouts based on viewport-height units?
1052. What distinguishes media queries from container queries when building reusable components?
1053. How would you choose a breakpoint from content constraints rather than device brand names?
1054. Why can fixed pixel widths fail when translated labels become substantially longer?
1055. How do logical CSS properties simplify support for different writing directions?
1056. When should text wrap naturally instead of being truncated with an ellipsis?
1057. How would you ensure truncated text remains available to keyboard and touch users?
1058. What creates a CSS stacking context beyond setting z-index directly?
1059. Why can an element with a very large z-index remain underneath another element?
1060. How does a transformed ancestor affect a descendant using fixed positioning?
1061. What conditions must hold for position: sticky to behave as intended?
1062. Why can overflow settings on an ancestor change sticky positioning behavior?
1063. How would you isolate component styles without continually increasing selector specificity?
1064. What role do cascade layers play when combining vendor styles and application overrides?
1065. How can CSS custom properties support themes while allowing local component overrides?
1066. What happens when a CSS variable used in a declaration has no valid value or fallback?
1067. How would you avoid a theme flash while respecting a user's stored choice and system preference?
1068. When does display: none differ from visibility: hidden in layout and accessibility behavior?
1069. Why can opacity: 0 leave an element interactive and focusable?
1070. What is the effect of pointer-events on mouse targeting compared with keyboard focus?
1071. How would you preserve an image's aspect ratio while filling a cropped container?
1072. What information should srcset and sizes provide for responsive image selection?
1073. When should an above-the-fold image avoid lazy loading?
1074. How can font loading change layout even after text is already visible?
1075. What tradeoffs separate blocking font display, swapping fonts, and using a close fallback?
1076. How would you decide which resource deserves a preload hint?
1077. What is the difference between preconnect and preloading a specific resource?
1078. Why can downloading a script asynchronously change assumptions about execution order?
1079. How does a deferred classic script differ from an async script during document parsing?
1080. What should a page's critical rendering path analysis include beyond network transfer time?
1081. How would you distinguish style recalculation from layout and paint costs in a browser profile?
1082. Why can animating transform or opacity behave differently from animating layout dimensions?
1083. When can excessive compositing layers increase memory use without improving performance?
1084. How would you render a long article efficiently without hiding content from navigation and search?
1085. What does event delegation gain when a list creates and removes many interactive children?
1086. How do event.target and event.currentTarget differ during a delegated handler?
1087. When does stopPropagation fail to prevent another handler on the same element?
1088. What default browser behavior remains after stopping event propagation?
1089. How would you handle a form submission consistently whether triggered by keyboard or pointer?
1090. Why must a file input's accept attribute not be treated as upload validation?
1091. What same-origin restrictions affect a script reading another frame's document?
1092. How would you validate messages received through window.postMessage?
1093. What is the difference between a cookie's Domain and Path scope?
1094. How do Secure and HttpOnly cookie attributes protect against different threats?
1095. Why can browser back-forward caching expose assumptions about page initialization running every visit?
1096. How would you detect and refresh stale state when a page is restored from browser history?
1097. What lifecycle limitations affect attempts to save data during page unload?
1098. How would you design an offline fallback that distinguishes unavailable data from a missing resource?
1099. What makes progressive enhancement different from assuming every browser has the same capabilities?
1100. How would you verify a responsive page using content extremes rather than only standard device presets?

## React and Angular application design

1101. How would you split a React component that mixes permissions, data loading, and presentation without duplicating state?
1102. What distinguishes a custom React hook sharing logic from sharing one state instance?
1103. How would you design a React hook's return contract so callers cannot create invalid state transitions?
1104. When should a React reducer reject an action rather than silently ignore it?
1105. How would you normalize a React state model containing entities referenced from several screens?
1106. What tradeoffs separate colocated React state from application-wide state for a temporary wizard?
1107. How would you preserve a React wizard's progress while allowing a step to be revisited safely?
1108. What distinguishes resetting a React component by key from manually resetting its fields?
1109. How would you decide whether a React key belongs to an entity or to one version of that entity?
1110. How can a React component's position in the tree affect whether its state is preserved?
1111. Why can defining a React component inside another component's render cause surprising remounts?
1112. How would you avoid storing React elements in state when the underlying domain data is sufficient?
1113. What consistency problem arises when React state stores both selected IDs and independent selected objects?
1114. How would you implement selecting all filtered rows across server-paginated React results?
1115. What state should survive when a React table changes its page size?
1116. How would you synchronize two React views editing the same cached entity?
1117. What happens when a React state initializer performs a side effect that is not safe to repeat?
1118. How would you distinguish an effect needed for synchronization from a calculation that belongs during rendering?
1119. Why can suppressing a React effect dependency warning leave a latent correctness defect?
1120. How would you move an action caused by a user click out of an unrelated React effect?
1121. What should a React subscription hook do if its source changes while the component remains mounted?
1122. How can React cleanup capture the exact resource created by a particular effect execution?
1123. Why should a React render remain safe to evaluate without committing its result to the screen?
1124. How would you make an external imperative library's updates consistent with React-owned input state?
1125. What does a React ref preserve without triggering a render when changed?
1126. How would you decide whether a value belongs in a ref or state based on its visible effects?
1127. Why can reading a ref during render produce an unreliable representation of external state?
1128. How would you expose a small imperative React component API without leaking its entire DOM structure?
1129. What should a React loading button communicate visually and to assistive technology?
1130. How would you prevent validation messages from appearing before a React user has interacted with a field?
1131. How should a React form preserve server validation errors until the relevant input actually changes?
1132. What contract should a reusable React field expose for description, error, and label associations?
1133. How would you compose React event handlers when both a library and consumer need to respond?
1134. What risks arise when a React component clones children and overwrites their props implicitly?
1135. How would you design a compound React component so nested parts report missing required context clearly?
1136. What distinguishes a React render prop from a hook when providing reusable behavior?
1137. How would you keep React localization changes from resetting unrelated component state?
1138. What should a React application do when persisted state has an older incompatible schema?
1139. How would you handle storage quota failures when persisting React drafts?
1140. What user-visible behavior should occur if a React draft cannot be saved locally?
1141. How would you test a React optimistic update whose server response contains a different canonical value?
1142. What cache invalidation should follow a React mutation that changes several filtered lists?
1143. How would you distinguish a background React query refresh from an initial blocking load?
1144. What information should a React empty state provide when filters exclude every result?
1145. How would you prevent stale pagination controls from requesting a page beyond the new result count?
1146. What tests would verify that a React component works with slow, failed, and empty data sources?
1147. How would you validate a React application's behavior when JavaScript chunks fail to download?
1148. What risks arise when a cached HTML page points to frontend asset names removed by a deployment?
1149. How would you design a React upgrade notice that lets users preserve unsaved work before reloading?
1150. What evidence justifies memoizing a React computation rather than simplifying its inputs or reducing its frequency?
1151. How would you structure an Angular feature so its public imports expose only intended components and services?
1152. What dependencies should an Angular presentational component avoid to remain reusable?
1153. How would you design an Angular service API that exposes observations without exposing internal subjects?
1154. What is the lifecycle difference between a root provider and a component-level provider in Angular?
1155. How can an Angular InjectionToken distinguish dependencies that share the same TypeScript shape?
1156. When would an Angular factory provider be preferable to directly constructing a service class?
1157. How would optional dependency injection change an Angular component's fallback behavior?
1158. What should happen when an Angular provider requires configuration that is not yet loaded?
1159. How would you avoid a circular dependency between Angular authentication and HTTP services?
1160. What makes constructor work harder to test when it starts network operations immediately?
1161. How would you represent Angular request status so stale results and current loading state cannot be confused?
1162. What ownership rule prevents several Angular subscribers from triggering duplicate cold HTTP streams?
1163. How would you choose whether an Angular data stream should replay its most recent result?
1164. What tradeoffs arise when an Angular cache stores complete observable chains instead of resolved values?
1165. How would you expire cached Angular requests without making all subscribers refetch simultaneously?
1166. What should an Angular data service return when an object has been deleted after being cached?
1167. How would you manage Angular cancellation when several views share one request?
1168. What distinction between debounceTime and throttleTime matters for an Angular drag preview?
1169. How would an RxJS distinctness comparator handle objects recreated with identical filter values?
1170. What happens if an RxJS error handler is placed outside a long-lived event-processing stream?
1171. How would you keep an Angular event stream alive after one recoverable request fails?
1172. What defines completion for an Angular save stream processing several pending edits?
1173. How would you expose progress when an Angular upload consists of several independent files?
1174. What should an Angular retry action reset besides the visible error message?
1175. How would you prevent nested Angular subscriptions from obscuring cancellation and error propagation?
1176. What role should a route's query parameters play in bookmarkable Angular filter state?
1177. How would you combine parent and child route parameters without relying on one initial snapshot?
1178. What information should an Angular deep link encode to reopen the same business context?
1179. How would you handle an Angular URL that references a resource the user can no longer access?
1180. What distinguishes a not-found route from a forbidden-resource state in an Angular application?
1181. How would you test a multi-step Angular navigation flow involving a resolver and a guard?
1182. What state should an Angular application clear when switching between tenants within one login?
1183. How would you preserve an Angular form's original baseline for a precise cancel operation?
1184. What differences between pristine, dirty, touched, and valid matter when displaying Angular form feedback?
1185. How would you validate a pair of Angular date controls whose combined range must satisfy a limit?
1186. What should an Angular form do when a previously selectable option is removed by the server?
1187. How would you represent a partially loaded Angular select control without treating missing options as invalid selections?
1188. What makes a custom Angular control participate correctly in parent form validation?
1189. How would you test an Angular control's behavior when programmatically reset to null?
1190. What accessibility relationships must an Angular wrapper preserve around its inner native input?
1191. How would you decide whether Angular content projection or an input configuration object fits an extension point?
1192. What change-detection assumptions arise when an Angular component integrates a callback from outside its usual scheduling environment?
1193. How would you update an Angular view after a third-party library changes data outside the framework's normal notification path?
1194. What makes an Angular track expression stable across both refreshes and reordering?
1195. How would you avoid repeatedly reconstructing large option arrays in an Angular template?
1196. What should an Angular error handler record while avoiding duplicate reports for already handled failures?
1197. How would you configure Angular production diagnostics so stack traces map to the correct release?
1198. What behaviors should remain observable in Angular tests without depending on private component methods?
1199. How would you test an Angular standalone component with only the providers it actually requires?
1200. What would you check before deleting an Angular shared module during a gradual architecture migration?

## JavaScript and TypeScript language contracts

1201. How do var and let differ when a variable is declared inside a loop block?
1202. What is the temporal dead zone for a JavaScript lexical binding?
1203. Why can typeof throw for a variable accessed within its temporal dead zone?
1204. What does const prevent when its value is a mutable JavaScript object?
1205. How do function declarations and function expressions differ in initialization timing?
1206. What distinguishes a JavaScript closure's captured binding from a snapshot of its value?
1207. How would you retain one independent callback value per iteration of a JavaScript loop?
1208. Why can closures retain a large parent object long after most of its data is unnecessary?
1209. How does JavaScript default-parameter evaluation differ from assigning a fallback inside the function?
1210. What values trigger a JavaScript default parameter, and which falsy values do not?
1211. How do rest parameters differ from the arguments object?
1212. What is the effect of returning an object explicitly from a JavaScript constructor?
1213. How does new.target distinguish construction from an ordinary function call?
1214. Why are JavaScript class methods not interchangeable with freely callable plain functions?
1215. How would you choose private class fields instead of a naming convention for internal state?
1216. What restrictions affect private-field access through a JavaScript Proxy?
1217. How do static class fields differ from per-instance fields?
1218. When can a base constructor's virtual-style method call encounter uninitialized subclass state in JavaScript?
1219. What does Object.create set without running a constructor?
1220. How would you inspect whether a property is writable, enumerable, or configurable?
1221. How does Object.defineProperty differ from ordinary assignment for property attributes?
1222. What distinguishes sealing an object from freezing it in JavaScript?
1223. Why does Object.freeze not automatically freeze nested objects?
1224. How would you deeply freeze a graph containing cycles without infinite recursion?
1225. Which properties does Object.keys omit compared with Reflect.ownKeys?
1226. How do symbol-keyed properties affect property enumeration and serialization?
1227. What makes a JavaScript Symbol suitable for avoiding accidental property-name collisions?
1228. How does Symbol.for differ from creating a fresh Symbol with the same description?
1229. What hooks allow a JavaScript object to customize conversion to a primitive value?
1230. How can implicit coercion invoke user-defined code during comparison or concatenation?
1231. How do Object.is and strict equality differ for NaN and signed zero?
1232. Why should loose equality be evaluated from its conversion rules rather than memorized examples?
1233. What does the nullish coalescing operator preserve that a Boolean OR fallback may discard?
1234. How does optional chaining stop evaluation when part of a property path is absent?
1235. What errors does optional chaining not suppress when an accessed getter throws?
1236. Why can destructuring a nested object still throw when an intermediate value is missing?
1237. How would you distinguish copying an object's own properties from preserving its prototype and descriptors?
1238. What kinds of JavaScript values cannot be reliably cloned through JSON serialization?
1239. How does structuredClone handle cycles compared with a JSON round trip?
1240. What semantics must a custom deep-equality function define for dates, maps, and cyclic references?
1241. How does a synchronous JavaScript iterator signal that no further values remain?
1242. What contract makes an object usable with for...of?
1243. How do for...in and for...of traverse different aspects of a JavaScript value?
1244. How can an iterator's return method participate in cleanup after a loop breaks?
1245. What state does a generator preserve while suspended at yield?
1246. How does passing a value to generator.next differ from supplying the generator's initial arguments?
1247. What happens when an error is injected into a generator through throw?
1248. How does yield* delegate iteration and return a nested generator's completion value?
1249. What distinctions matter between an iterable that can restart and an iterator that is already consumed?
1250. How would you bound an iterator pipeline that may receive an infinite source?
1251. How does the JavaScript event loop separate tasks from microtasks?
1252. What ordering should be examined when a promise reaction and a timer callback both become ready?
1253. Why does await always involve promise-style continuation semantics even for a plain value?
1254. What does async function execution perform before reaching its first suspension point?
1255. How can omitting await from a required operation make a function report completion too early?
1256. What distinguishes a rejected promise from an unhandled rejection notification?
1257. How would you adapt an error-first callback API into a promise without resolving twice?
1258. Why should a promise executor normally avoid being an async function?
1259. How does Promise.allSettled preserve information that fail-fast aggregation can omit?
1260. What failure result does Promise.any produce when every candidate rejects?
1261. How would you implement a concurrency-limited mapper while preserving output order?
1262. What state must a debounced function retain to support both cancellation and flushing?
1263. How do leading and trailing invocations affect the contract of a throttled function?
1264. How would you design an asynchronous mutex so cancellation does not abandon ownership after acquisition?
1265. What should a resource-owning JavaScript API do if initialization is cancelled before it returns a handle?
1266. How do live ES module bindings differ from copying an exported property's current value?
1267. Why can top-level await delay modules that depend on the awaiting module?
1268. How would you handle failure when dynamically importing an optional feature module?
1269. What does a package's exports map control beyond its main entry point?
1270. How can conditional exports lead development and production to load different implementations?
1271. What are the compatibility consequences of changing a package from CommonJS to ESM?
1272. How would you verify that a published package includes runtime files as well as type declarations?
1273. What distinguishes a dependency required at runtime from a build-only development dependency?
1274. Why can duplicate installed versions of a stateful library create incompatible shared instances?
1275. How would you test a package using its packed artifact rather than its source workspace?
1276. How does TypeScript structural typing differ from requiring explicit interface implementation?
1277. Why can excess-property checks apply to an object literal but not every compatible variable?
1278. What distinguishes a union type from an intersection type in accepted values?
1279. How can the never type reveal an unreachable or unhandled branch?
1280. Why is unknown safer than any at an unvalidated boundary?
1281. What conditions must a user-defined TypeScript type predicate actually prove at runtime?
1282. How can a dishonest type guard make otherwise well-typed code fail?
1283. What does the satisfies operator verify without forcing the expression to lose its inferred shape?
1284. How does as const affect literal widening and readonly inference?
1285. Why can a TypeScript literal widen to string and stop matching a discriminated-union branch?
1286. How would you preserve tuple positions when a helper returns several differently typed values?
1287. What distinctions matter between an optional tuple element and an element whose type includes undefined?
1288. How does keyof support APIs that accept only valid property names?
1289. How would an indexed-access type express the value associated with a selected object key?
1290. What can a conditional type infer from a function's return signature?
1291. How do distributive conditional types behave when applied to a union?
1292. When would preventing conditional-type distribution change the intended result?
1293. What limits should be considered before introducing deeply recursive TypeScript utility types?
1294. How can template-literal types restrict event names derived from known property keys?
1295. Why do branded types help distinguish identifiers that share the same runtime primitive?
1296. How would a constructor validate data before granting it a branded TypeScript type?
1297. What declaration changes can break TypeScript consumers without changing emitted JavaScript?
1298. How does strictFunctionTypes expose unsafe callback substitutions?
1299. Why can skipLibCheck hide declaration conflicts without resolving their underlying incompatibility?
1300. What compatibility matrix would you test before publishing a library for several TypeScript compiler versions?

## Algorithms and data structures

1301. How would you find a pair with a target sum when the input is sorted and extra space is limited?
1302. How would you return all unique three-number combinations summing to zero without duplicate results?
1303. How would you find the shortest subarray whose sum reaches a threshold when values are positive?
1304. What changes in that shortest-subarray problem when negative values are permitted?
1305. How would you find the longest substring containing at most k distinct symbols?
1306. How would you locate all anagram occurrences of a pattern in a longer string?
1307. How would you determine whether one string is a rotation of another?
1308. How would you compare strings containing backspace operations without constructing their full edited forms?
1309. How would you find the smallest window containing all required characters with their multiplicities?
1310. How would you compress repeated characters in place while returning the new logical length?
1311. How would you partition an array around a pivot while preserving all elements?
1312. How would you move zero values to the end while preserving the order of nonzero values?
1313. How would you merge two sorted arrays when the first has enough trailing capacity?
1314. How would you calculate products of all other array elements without division?
1315. How would you find the first missing positive integer with linear time and constant auxiliary space?
1316. How would you identify one duplicated number without modifying the input array under constrained value ranges?
1317. How would you detect whether an array contains a majority element and verify the candidate?
1318. How would you find elements occurring more than n divided by three times?
1319. How would you rotate an array by k positions in place?
1320. How would you compute trapped rainwater from bar heights and justify the invariant?
1321. How would you find the largest rectangle in a histogram?
1322. How would you compute the maximum value in every fixed-size sliding window?
1323. How would you answer many immutable array range-sum queries efficiently?
1324. How would you support point updates and prefix-sum queries with a Fenwick tree?
1325. When would a segment tree be preferable to a prefix-sum array?
1326. How would lazy propagation support repeated range updates without visiting every element?
1327. How would you find the kth smallest element without fully sorting the array?
1328. What input choices can make a naive quickselect implementation perform poorly?
1329. How would you merge k sorted streams using bounded extra memory?
1330. How would you maintain the median of a stream using two heaps?
1331. How would you retrieve the most frequent k items without sorting every distinct item?
1332. How would you implement an LRU cache with constant-time lookup and recency updates?
1333. What extra state does an LFU cache require to break frequency ties predictably?
1334. How would you design a stack that returns its minimum in constant time?
1335. How would you implement a FIFO queue using two stacks and explain amortized cost?
1336. How would you implement a stack using queue operations while documenting the expensive operation?
1337. How would you validate nested brackets while ignoring brackets inside quoted strings?
1338. How would you evaluate a postfix arithmetic expression and reject malformed input?
1339. How would you convert infix expressions while respecting precedence and associativity?
1340. How would you find each element's next greater value using a monotonic stack?
1341. How would you detect a cycle in a singly linked list without extra storage?
1342. How would you locate the first node of a detected linked-list cycle?
1343. How would you reverse a linked list in groups of k nodes?
1344. How would you remove the nth node from the end in one pass?
1345. How would you find the intersection of two linked lists by node identity?
1346. How would you copy a linked list whose nodes also contain arbitrary cross-references?
1347. How would you check whether a linked list is a palindrome while restoring its original structure?
1348. How would you merge sorted linked lists without allocating replacement nodes?
1349. How would you flatten a multilevel linked structure while preserving traversal order?
1350. What invariants protect both ends of a doubly linked list during deletion?
1351. How would you traverse a binary tree level by level without recursive depth assumptions?
1352. How would you perform postorder traversal iteratively?
1353. How would you determine whether a binary tree satisfies search-tree ordering globally?
1354. How would you find a binary search tree's kth smallest value?
1355. How would you find the lowest common ancestor when one requested node may be absent?
1356. How would you compute a tree's diameter without recalculating subtree heights repeatedly?
1357. How would you find the maximum-sum path when node values may be negative?
1358. How would you serialize and reconstruct a binary tree including missing children unambiguously?
1359. How would you reconstruct a binary tree from traversal sequences and detect inconsistent input?
1360. How would you determine whether a binary tree is height-balanced in one traversal?
1361. How would you check whether one tree is structurally a subtree of another?
1362. How would you generate all root-to-leaf paths whose values sum to a target?
1363. How would you convert a sorted sequence into a height-balanced search tree?
1364. How would you delete a binary-search-tree node that has two children?
1365. What metadata lets an ordered tree support rank and selection operations?
1366. How would you implement prefix lookup with a trie while controlling memory for sparse branches?
1367. How would a trie support wildcard character matching?
1368. How would you find the longest common prefix across many strings?
1369. How would you detect duplicate subtrees using canonical representations?
1370. How would you traverse a graph without revisiting nodes in a cycle?
1371. When does breadth-first search find a shortest path without a priority queue?
1372. Why can Dijkstra's algorithm fail when edges have negative weights?
1373. How would you detect a reachable negative-weight cycle?
1374. How would you order tasks with prerequisites and report a dependency cycle?
1375. How would you identify connected components in an undirected graph?
1376. How would union-find support repeated connectivity queries as edges are added?
1377. What do path compression and union by rank improve in a disjoint-set structure?
1378. How would you determine whether a graph can be split into two nonconflicting groups?
1379. How would you find bridges whose removal disconnects an undirected graph?
1380. How would you identify strongly connected components in a directed graph?
1381. How would you solve coin change when the objective is minimum coins rather than counting combinations?
1382. How would you count coin combinations without treating different selection orders as distinct?
1383. How would you solve zero-one knapsack while ensuring an item is used at most once?
1384. How would you determine whether a sequence can be partitioned into equal-sum subsets?
1385. How would you compute the longest increasing subsequence faster than quadratic time?
1386. How would you reconstruct an actual longest increasing subsequence, not only its length?
1387. How would you compute edit distance and reconstruct one sequence of edits?
1388. How would you calculate the longest common subsequence using reduced memory?
1389. What distinction separates longest palindromic substring from longest palindromic subsequence?
1390. How would you count paths through a grid containing blocked cells?
1391. How would you maximize nonadjacent selected values when the sequence is arranged in a circle?
1392. How would you plan stock trades when each sale incurs a fee?
1393. How would a cooldown requirement change a stock-trading dynamic program's states?
1394. How would you determine whether a string can be segmented into dictionary words?
1395. How would you enumerate permutations while avoiding duplicates from repeated values?
1396. How would you solve a constraint-placement puzzle using backtracking and early pruning?
1397. How would you compare greedy and dynamic-programming solutions by finding a counterexample to the greedy rule?
1398. How would you prove binary search termination when choosing between inclusive and exclusive bounds?
1399. How would you binary-search the smallest feasible capacity when a decision predicate is monotonic?
1400. How would you test an algorithm's claimed complexity using inputs that stress its worst-case behavior?

## Data engineering and AI evaluation

1401. How would you choose the grain of a fact table before defining its measures and dimensions?
1402. How would you distinguish an additive measure from a balance that cannot be summed across time?
1403. How would you model an order with several promotions without multiplying its revenue in reports?
1404. How would you preserve a customer's historical region when the customer moves to another region?
1405. How would you load a sales fact that arrives before its customer dimension record?
1406. How would you distinguish a corrected historical attribute from a genuine change in that attribute?
1407. How would you represent a missing dimension key without dropping the associated facts?
1408. How would you design a date dimension for both calendar and fiscal reporting?
1409. How would you model several currencies while preserving the exchange rate used for each transaction?
1410. How would you reconcile a warehouse revenue measure with a ledger that posts adjustments on different dates?
1411. How would you establish a consistent boundary between an initial database snapshot and subsequent change events?
1412. How would you process a delete event when the source does not include the deleted row's previous values?
1413. How would you prevent an older change event from overwriting a newer version of the same record?
1414. How would you recover a change-data-capture pipeline after the source log has expired?
1415. How would you propagate a source column rename without silently treating it as a new business attribute?
1416. How would you distinguish event time, ingestion time, and processing time in a streaming report?
1417. How would you choose a watermark when most events arrive quickly but a small fraction arrive days late?
1418. How would you revise a previously published window aggregate after receiving a late event?
1419. How would you bound the state required for deduplication in a stream with no natural end?
1420. How would you join two event streams whose matching events can arrive hours apart?
1421. How would you detect that one partition is falling behind while overall pipeline throughput appears healthy?
1422. How would you isolate malformed messages so that they can be repaired and replayed?
1423. How would you make an object-storage write and a processing checkpoint recoverable when either can fail?
1424. How would you backfill a year of data while the same pipeline continues processing live events?
1425. How would you decide whether to recompute an aggregate or apply a compensating adjustment?
1426. How would you choose file sizes for a data lake that receives many small updates?
1427. How would you select partition columns when queries filter by date and customer but customer cardinality is very high?
1428. How would you verify that partition pruning actually reduces the files scanned by a query?
1429. How would you evolve a nested data schema while allowing older readers to continue working?
1430. How would you retain enough table history for reproducible analysis without keeping every obsolete file forever?
1431. How would you prevent two scheduled transformations from publishing conflicting versions of a reporting table?
1432. How would you document column-level lineage for a metric assembled from several source systems?
1433. How would you distinguish a data-freshness failure from a valid day with no business activity?
1434. How would you test a transformation whose correct output depends on daylight-saving transitions?
1435. How would you set anomaly thresholds for a daily count that changes substantially by weekday?
1436. How would you detect a source system that keeps sending records but has stopped updating one important field?
1437. How would you reconcile duplicate customer identities without losing the provenance of their source records?
1438. How would you mask sensitive fields in a development dataset while preserving useful join relationships?
1439. How would you implement a retention policy when derived tables contain copies of deleted source records?
1440. How would you make a failed transformation reproducible when its upstream inputs have already changed?
1441. How would you explain the difference between row context and filter context using a sales calculation in Power BI?
1442. How would you diagnose a Power BI grand total that differs from the sum users expect from visible rows?
1443. How would you choose between a calculated column and a measure for a value that depends on report filters?
1444. How would you model two date relationships so a report can analyze both order date and delivery date?
1445. How would you test row-level security for a manager who belongs to several organizational groups?
1446. How would you investigate a report that is fast in import mode but slow with DirectQuery?
1447. How would you choose between embedding and referencing related documents in MongoDB when their update patterns differ?
1448. How would you prevent a document containing an ever-growing activity array from becoming a storage and update bottleneck?
1449. How would you select a shard key for a collection with a few extremely active tenants?
1450. How would you check that a document-store index supports both a query's filter and its requested sort order?
1451. How would you define the unit of evaluation for an assistant that completes a task over several conversation turns?
1452. How would you build a held-out evaluation set when many customer requests are near-duplicates of one another?
1453. How would you prevent future information from leaking into a model evaluated on historical predictions?
1454. How would you compare model performance across customer groups when their evaluation sample sizes differ greatly?
1455. How would you report uncertainty around an accuracy estimate based on only a few dozen examples?
1456. How would you distinguish a statistically detectable improvement from one that matters to users?
1457. How would you design an evaluation for a classifier when the costly failure is missing a rare positive case?
1458. How would you select a classification threshold when false positives and false negatives have different operational costs?
1459. How would you assess whether a model's confidence scores are calibrated?
1460. How would you evaluate an abstention policy that routes uncertain predictions to human reviewers?
1461. How would you measure disagreement between human annotators before using their labels as an evaluation standard?
1462. How would you revise a labeling rubric when two defensible interpretations of a request produce different scores?
1463. How would you evaluate open-ended answers when several different responses could all be correct?
1464. How would you keep repeated experiments from overfitting a team to the same small benchmark?
1465. How would you detect benchmark contamination when evaluating a model with unknown training data?
1466. How would you separate retrieval failures from reasoning failures using controlled evaluation inputs?
1467. How would you construct hard negative retrieval examples that are plausible but do not answer the question?
1468. How would you evaluate retrieval for questions that require combining evidence from several documents?
1469. How would you compare chunking strategies without allowing one strategy a much larger context budget?
1470. How would you test whether a reranker improves the final answer rather than merely moving relevant documents upward?
1471. How would you evaluate a search system on misspellings, abbreviations, and multilingual queries?
1472. How would you detect an embedding migration that changes nearest neighbors for important query categories?
1473. How would you assess whether an answer correctly identifies that the available evidence is insufficient?
1474. How would you evaluate numerical answers that require unit conversion and arithmetic over retrieved tables?
1475. How would you test whether document position within a long context changes an assistant's answer?
1476. How would you evaluate a summarizer's coverage of key decisions without rewarding unnecessary length?
1477. How would you measure whether a summary preserves who made a claim and how certain they were?
1478. How would you test a translation system for preservation of names, numbers, and domain-specific terms?
1479. How would you evaluate extracted fields when a source document legitimately omits some requested values?
1480. How would you compare two structured-output systems when one produces more valid schemas but less accurate field values?
1481. How would you build a replayable test environment for an agent whose tools normally read changing external data?
1482. How would you score an agent that reaches the correct result through unnecessary or expensive tool calls?
1483. How would you test an agent's recovery when a tool returns an empty result, a permission error, or malformed data?
1484. How would you evaluate whether an agent asks for clarification at the right point in an ambiguous task?
1485. How would you measure task success when the user changes a requirement midway through an agent run?
1486. How would you construct tests for an agent that must observe a spending limit across multiple purchases?
1487. How would you evaluate whether a proposed action is supported by the tool observations available at that step?
1488. How would you detect that an agent reports success even though a required external state change never occurred?
1489. How would you compare agent runs fairly when their tools have nondeterministic response times?
1490. How would you determine whether a failure comes from the model, the tool contract, or the orchestration logic?
1491. How would you create adversarial tests for sensitive-data disclosure without putting real secrets into the test corpus?
1492. How would you measure the tradeoff between blocking harmful requests and rejecting legitimate requests?
1493. How would you test whether an assistant treats untrusted spreadsheet cells or document metadata as instructions?
1494. How would you verify that a model-generated shell command remains within the files authorized for a task?
1495. How would you design a production evaluation sample that does not expose private user conversations to unnecessary reviewers?
1496. How would you compare models under the same end-to-end latency and cost constraints?
1497. How would you detect quality degradation caused by truncating inputs to reduce inference cost?
1498. How would you stage a model rollout so that regressions in a small but important task category trigger a rollback?
1499. How would you monitor changes in incoming requests that make an old evaluation set less representative?
1500. How would you turn a production failure into a regression test without encoding only the exact wording of that incident?
