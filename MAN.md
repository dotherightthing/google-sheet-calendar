## Classes

<dl>
<dt><a href="#GscApp">GscApp</a></dt>
<dd></dd>
<dt><a href="#GscCache">GscCache</a></dt>
<dd></dd>
<dt><a href="#GscCalendar">GscCalendar</a></dt>
<dd></dd>
<dt><a href="#GscSheet">GscSheet</a></dt>
<dd></dd>
<dt><a href="#GscUtils">GscUtils</a></dt>
<dd></dd>
</dl>

<a name="GscApp"></a>

## GscApp
**Kind**: global class  
**Summary**: Shares settings between classes and provides helper methods.  
**Access**: public  
<a name="new_GscApp_new"></a>

### new GscApp(config)

| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | Module configuration. |
| config.debug | <code>boolean</code> | Output debugging messages. |
| config.deploymentIds | <code>object</code> | Deployment IDs of this standalone project |
| config.scriptIds | <code>object</code> | IDs of the various Apps Scripts |
| config.user | <code>object</code> | Employee referenced in spreadsheet |

<a name="GscCache"></a>

## GscCache
**Kind**: global class  
**Summary**: Temporarily cache results that take time to fetch/compute (memoization).
 Current limitations - value size: 9 KB, property store: 500 KB  
**Access**: public  
**See**: [https://developers.google.com/apps-script/guides/services/quotas](https://developers.google.com/apps-script/guides/services/quotas)  

* [GscCache](#GscCache)
    * [new GscCache(config)](#new_GscCache_new)
    * [.clearCache()](#GscCache.clearCache) ⇒ <code>string</code>
    * [.getCacheItem(key)](#GscCache.getCacheItem) ⇒ <code>object</code>
    * [.cacheLog()](#GscCache.cacheLog) ⇒ <code>object</code>
    * [.setCacheItem(key, value)](#GscCache.setCacheItem)

<a name="new_GscCache_new"></a>

### new GscCache(config)

| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | Module configuration. |
| config.debug | <code>boolean</code> | Output debugging messages. |

<a name="GscCache.clearCache"></a>

### GscCache.clearCache() ⇒ <code>string</code>
clearCache

**Kind**: static method of [<code>GscCache</code>](#GscCache)  
**Summary**: Removes all keys and values from the script cache.  
**Returns**: <code>string</code> - Success message  
<a name="GscCache.getCacheItem"></a>

### GscCache.getCacheItem(key) ⇒ <code>object</code>
getCacheItem

**Kind**: static method of [<code>GscCache</code>](#GscCache)  
**Summary**: Get the value of an item in the script cache.  
**Returns**: <code>object</code> - Cache value  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Unique cache key |

<a name="GscCache.cacheLog"></a>

### GscCache.cacheLog() ⇒ <code>object</code>
cacheLog

**Kind**: static method of [<code>GscCache</code>](#GscCache)  
**Summary**: Outputs the contents of the script cache to the console.  
**Returns**: <code>object</code> - Cache contents, sorted alphabetically.  
**See**: [https://spreadsheet.dev/array-method-sort-in-apps-script](https://spreadsheet.dev/array-method-sort-in-apps-script)  
<a name="GscCache.setCacheItem"></a>

### GscCache.setCacheItem(key, value)
setCacheItem

**Kind**: static method of [<code>GscCache</code>](#GscCache)  
**Summary**: Set the value of an item in the script cache.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Unique cache key |
| value | <code>object</code> | Cache value |

<a name="GscCalendar"></a>

## GscCalendar
**Kind**: global class  
**Summary**: Properties and methods relating to copying scheduling from spreadsheet to calendar.  

* [GscCalendar](#GscCalendar)
    * [new GscCalendar(config)](#new_GscCalendar_new)
    * [.getWeeks(sheetName)](#GscCalendar.getWeeks) ⇒ <code>Array</code>
    * [.devApp()](#GscCalendar.devApp) ⇒ <code>boolean</code>

<a name="new_GscCalendar_new"></a>

### new GscCalendar(config)

| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | Module configuration. |

<a name="GscCalendar.getWeeks"></a>

### GscCalendar.getWeeks(sheetName) ⇒ <code>Array</code>
getWeeks

**Kind**: static method of [<code>GscCalendar</code>](#GscCalendar)  
**Summary**: Get an array of weeks  
**Returns**: <code>Array</code> - weeks Array of weeks, each week containing an array of days  

| Param | Type | Description |
| --- | --- | --- |
| sheetName | <code>string</code> | Sheet name |

<a name="GscCalendar.devApp"></a>

### GscCalendar.devApp() ⇒ <code>boolean</code>
devApp

**Kind**: static method of [<code>GscCalendar</code>](#GscCalendar)  
**Summary**: Get dates from sheet and post to calendar  
**Returns**: <code>boolean</code> - True if successful  
<a name="GscSheet"></a>

## GscSheet
**Kind**: global class  
**Summary**: Properties and methods relating to querying of the spreadsheet.  

* [GscSheet](#GscSheet)
    * [new GscSheet(config)](#new_GscSheet_new)
    * [.getCellByString(sheetName, cellText)](#GscSheet.getCellByString) ⇒ <code>object</code>
    * [.getColumnIndex(sheetName, cellText)](#GscSheet.getColumnIndex) ⇒ <code>number</code>
    * [.getColumnIndexDate(sheetName)](#GscSheet.getColumnIndexDate) ⇒ <code>number</code>
    * [.getColumnIndexUser(sheetName)](#GscSheet.getColumnIndexUser) ⇒ <code>number</code>
    * [.getRowIndex(sheetName, cellText)](#GscSheet.getRowIndex) ⇒ <code>number</code>
    * [.getRowIndexFirst(sheetName)](#GscSheet.getRowIndexFirst) ⇒ <code>number</code>
    * [.getRowIndexLast(sheetName)](#GscSheet.getRowIndexLast) ⇒ <code>number</code>
    * [.getSheet(sheetName)](#GscSheet.getSheet) ⇒ <code>\*</code>
    * [.getSheetName()](#GscSheet.getSheetName) ⇒ <code>string</code>

<a name="new_GscSheet_new"></a>

### new GscSheet(config)

| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | Module configuration. |
| config.spreadsheetId | <code>object</code> | Unique ID of the spreadsheet (taken from their URL). |

<a name="GscSheet.getCellByString"></a>

### GscSheet.getCellByString(sheetName, cellText) ⇒ <code>object</code>
getCellByString

**Kind**: static method of [<code>GscSheet</code>](#GscSheet)  
**Summary**: Get a reference to spreadsheet cells containing the specified text.  
**Returns**: <code>object</code> - Range object  

| Param | Type | Description |
| --- | --- | --- |
| sheetName | <code>string</code> | Sheet name |
| cellText | <code>string</code> | Cell text |

<a name="GscSheet.getColumnIndex"></a>

### GscSheet.getColumnIndex(sheetName, cellText) ⇒ <code>number</code>
getColumnIndex

**Kind**: static method of [<code>GscSheet</code>](#GscSheet)  
**Summary**: Get the number of the spreadsheet column containing the specified text (to find the column headers).  
**Returns**: <code>number</code> - columnIndex  
**See**

- [https://stackoverflow.com/a/64289303](https://stackoverflow.com/a/64289303)
- [https://developers.google.com/apps-script/reference/spreadsheet/range?hl=en#getColumn()](https://developers.google.com/apps-script/reference/spreadsheet/range?hl=en#getColumn()))


| Param | Type | Description |
| --- | --- | --- |
| sheetName | <code>string</code> | Sheet name |
| cellText | <code>string</code> | Cell text |

<a name="GscSheet.getColumnIndexDate"></a>

### GscSheet.getColumnIndexDate(sheetName) ⇒ <code>number</code>
getColumnIndexDate

**Kind**: static method of [<code>GscSheet</code>](#GscSheet)  
**Summary**: Get the number of the spreadsheet column containing each week's starting date.  
**Returns**: <code>number</code> - columnIndex  

| Param | Type | Description |
| --- | --- | --- |
| sheetName | <code>string</code> | Sheet name |

<a name="GscSheet.getColumnIndexUser"></a>

### GscSheet.getColumnIndexUser(sheetName) ⇒ <code>number</code>
getColumnIndexUser

**Kind**: static method of [<code>GscSheet</code>](#GscSheet)  
**Summary**: Get the number of the spreadsheet column containing the user's name.  
**Returns**: <code>number</code> - columnIndex  

| Param | Type | Description |
| --- | --- | --- |
| sheetName | <code>string</code> | Sheet name |

<a name="GscSheet.getRowIndex"></a>

### GscSheet.getRowIndex(sheetName, cellText) ⇒ <code>number</code>
getRowIndex

**Kind**: static method of [<code>GscSheet</code>](#GscSheet)  
**Summary**: Get the number of the spreadsheet row containing the specified text, to find the runs start and end rows.  
**Returns**: <code>number</code> - rowIndex  

| Param | Type | Description |
| --- | --- | --- |
| sheetName | <code>object</code> | Sheet name |
| cellText | <code>string</code> | Cell text |

<a name="GscSheet.getRowIndexFirst"></a>

### GscSheet.getRowIndexFirst(sheetName) ⇒ <code>number</code>
getRowIndexFirst

**Kind**: static method of [<code>GscSheet</code>](#GscSheet)  
**Summary**: Get the number of the first populated spreadsheet row (containing column headers).  
**Returns**: <code>number</code> - rowIndex  

| Param | Type | Description |
| --- | --- | --- |
| sheetName | <code>string</code> | Sheet name |

<a name="GscSheet.getRowIndexLast"></a>

### GscSheet.getRowIndexLast(sheetName) ⇒ <code>number</code>
getRowIndexLast

**Kind**: static method of [<code>GscSheet</code>](#GscSheet)  
**Summary**: Get the number of the last populated spreadsheet row.  
**Returns**: <code>number</code> - rowIndex  

| Param | Type | Description |
| --- | --- | --- |
| sheetName | <code>string</code> | Sheet name |

<a name="GscSheet.getSheet"></a>

### GscSheet.getSheet(sheetName) ⇒ <code>\*</code>
getSheet

**Kind**: static method of [<code>GscSheet</code>](#GscSheet)  
**Summary**: Get (this year's) sheet.  
**Returns**: <code>\*</code> - sheet  

| Param | Type | Description |
| --- | --- | --- |
| sheetName | <code>string</code> | Sheet name |

<a name="GscSheet.getSheetName"></a>

### GscSheet.getSheetName() ⇒ <code>string</code>
getSheetName

**Kind**: static method of [<code>GscSheet</code>](#GscSheet)  
**Summary**: Get the name of (this year's) sheet.  
**Returns**: <code>string</code> - sheetName  
<a name="GscUtils"></a>

## GscUtils
**Kind**: global class  
**Summary**: Utility methods.  
**Access**: public  

* [GscUtils](#GscUtils)
    * [new GscUtils(config)](#new_GscUtils_new)
    * [.isDate(str)](#GscUtils.isDate) ⇒ <code>string</code>
    * [.objectsMatch(obj1, obj2)](#GscUtils.objectsMatch) ⇒ <code>boolean</code>
    * [.stringToCapitalised(str)](#GscUtils.stringToCapitalised) ⇒ <code>string</code>
    * [.stringToId(str)](#GscUtils.stringToId) ⇒ <code>string</code>

<a name="new_GscUtils_new"></a>

### new GscUtils(config)

| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | Module configuration. |
| config.runGroups | <code>Array</code> | Groups of runs, where each group occupies a different tab/sheet in the spreadsheet. |

<a name="GscUtils.isDate"></a>

### GscUtils.isDate(str) ⇒ <code>string</code>
isDate

**Kind**: static method of [<code>GscUtils</code>](#GscUtils)  
**Summary**: Determine whether cell contents string is a date.  
**Returns**: <code>string</code> - safeStr  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | String to convert |

<a name="GscUtils.objectsMatch"></a>

### GscUtils.objectsMatch(obj1, obj2) ⇒ <code>boolean</code>
objectsMatch

**Kind**: static method of [<code>GscUtils</code>](#GscUtils)  
**Summary**: Determine whether 2 objects are the same  
**Returns**: <code>boolean</code> - match  
**See**: [https://codepen.io/w3resource/pen/gjBqor](https://codepen.io/w3resource/pen/gjBqor)  

| Param | Type | Description |
| --- | --- | --- |
| obj1 | <code>object</code> | Object 1 |
| obj2 | <code>object</code> | Object 2 |

<a name="GscUtils.stringToCapitalised"></a>

### GscUtils.stringToCapitalised(str) ⇒ <code>string</code>
stringToCapitalised

**Kind**: static method of [<code>GscUtils</code>](#GscUtils)  
**Summary**: Capitalise a string  
**Returns**: <code>string</code> - capitalisedStr  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | String to convert |

<a name="GscUtils.stringToId"></a>

### GscUtils.stringToId(str) ⇒ <code>string</code>
stringToId

**Kind**: static method of [<code>GscUtils</code>](#GscUtils)  
**Summary**: Convert a string into a form safe for use as an HTML id attribute.  
**Returns**: <code>string</code> - safeStr  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | String to convert |


* * *

&copy; 2022 Dan Smith / Do The Right Thing