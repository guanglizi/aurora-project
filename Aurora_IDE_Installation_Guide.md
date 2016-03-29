  * 说明几种IDE安装的方法。使用者可以根据具体条件选择不同的安装方法。
  * 下面方法安装或更新IDE时都适用。

# 三种安装方法 #
  1. 连线自动更新
  1. 离线自动更新
  1. 离线解压安装

# 连线自动更新 #

  * 适用网络环境比较好的朋友，或中国大陆以外的地区或国家。

  1. 选择菜单栏中help菜单
  1. 选择install New Software..
  1. 在打开的对话框work with位置中输入:http://aurora-project.googlecode.com/svn/trunk/uncertain_ide_release/
  1. eclipse 开始自动查找需要安装的IDE。
  1. 出现列表后选择最新版本的AuroraIDE和AuroraIDELibrary
  1. next开始eclipse的自动安装。
  1. 安装过程中遇到提示，请选择OK。
  1. 此过程可能会需要很长时间，视网络情况而定。
  1. 安装完成后重新启动。
  1. 在About Eclipse菜单中确认是否安装成功。

# 离线自动更新 #

  1. 适合可以访问网络，尤其适合中国大陆的朋友。

  1. 下载最新的安装包[安装包下载](http://aurora-project.googlecode.com/svn/trunk/uncertain_ide_release/Aurora_IDE.zip)
  1. 参考[连线自动更新]方式。
  1. 注意：work with位置选择刚刚下载好的安装包。
  1. 注意：在安装更新对话框中，取消\_contact all update sites during install to find required software_选项。
  1. 如不取消，速度同连线自动更新方式。_

# 离线解压安装 #

  1. 适合可以访问网络，尤其适合中国大陆的朋友。
  1. 喜欢研究并且愿意自己管理eclipse插件的朋友。

  1. 下载最新的安装包[安装包下载](http://aurora-project.googlecode.com/svn/trunk/uncertain_ide_release/Aurora_IDE.zip)
  1. 将压缩包解压，删除site.xml
  1. 保证目录结构为aurora\_ide/plugins和aurora\_ide/features
  1. 将aurora\_ide目录丢到，eclipse/dropins
  1. 删除eclipse/configuration/org.eclipse.osgi
  1. 完成后重新启动。
  1. 在About Eclipse菜单中确认是否安装成功。