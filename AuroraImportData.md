  * ### Aurora导入支持如下数据类型: ###
    * .xls
    * .xlsx
    * .cvs
    * .txt
  * ### 具体实现 ###
  1. 标记注册,在uncertain.xml中注册导入标记
```
<uncertain-engine name="hec">
  <packages>
   <package-path classPath="aurora_plugin_package/aurora.plugin.dataimport"/>
   ...
   </packages>
</uncertain-engine>
```
  1. screen文件,HTML标准的文件上传
```
<form name="upload" action="upload.svc" enctype="multipart/form-data" method="post">
 <input name="CONTENT" type="file"/>
 <input type="submit"/>
</form>
```
  1. svc文件
```
<a:service xmlns:a="http://www.aurora-framework.org/application">
    <a:init-procedure outputPath="/parameter">
        <a:model-query model="sys.get_sys_import_head_id" rootPath="header"/>
        <a:import-excel header_id="${/model/header/record/@header_id}"/>
    </a:init-procedure>    
</a:service>
```
  * ### import-excel 标记属性 ###

| **属性名** | **类型** | **描述** | **必须** | **默认值** |
|:--------|:-------|:-------|:-------|:--------|
| header\_id | in     | fnd\_interface\_headers表中的header\_id | true   |         |
| dataSourceName | in     | 导入数据库的dataSourceName | fasle  |         |
| user\_id | in     | 当前用户user\_id | false  | ${/session/@user\_id} |
| separator | in     | 导入文本类型时的分隔符 | false  | ,       |
| job\_id | in     | 任务id   | false  |         |
| attribute1 | in     | 扩展字段1  | false  |         |
| attribute2 | in     | 扩展字段2  | false  |         |
| attribute3 | in     | 扩展字段3  | false  |         |
| attribute4 | in     | 扩展字段4  | false  |         |
| attribute5 | in     | 扩展字段5  | false  |         |