# 代码更新 #

# 更新aurora java代码
# 更新AuroraUI中的components.xml
＃更新web项目中的模板目录，确保包包含文件 ui.template/theme/default/template/defaultIncludedScreen.tplt


# 使用方式 #

在界面中需要输出另一个screen的地方，使用标记



&lt;a:screen-include screen="&lt;screen文件的路径&gt;" /&gt;



支持动态参数，如screen="${/model/workflow/@display\_screen}"