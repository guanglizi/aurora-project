package aurora.ide.builder.processor;

import java.util.regex.Pattern;

import org.eclipse.core.resources.IContainer;
import org.eclipse.core.resources.IFile;
import org.eclipse.core.runtime.IPath;
import org.eclipse.core.runtime.Path;
import org.eclipse.jface.text.IDocument;
import org.eclipse.jface.text.IRegion;

import uncertain.composite.CompositeMap;
import uncertain.schema.Attribute;
import aurora.ide.builder.AuroraBuilder;
import aurora.ide.builder.BuildContext;
import aurora.ide.builder.SxsdUtil;
import aurora.ide.search.core.Util;

public class ScreenProcessor extends AbstractProcessor {
	private static final Pattern siPattern = Pattern
			.compile("/{0,1}([a-zA-Z_\\d]+/)*[a-zA-Z_\\d]+\\.screen(\\?.*){0,1}");

	@Override
	public void processMap(BuildContext bc) {
		if (BuildContext.LEVEL_UNDEFINED_SCREEN == 0)
			return;
		processAttribute(bc);
	}

	@Override
	public void visitAttribute(Attribute a, BuildContext bc) {
		if (SxsdUtil.isScreenReference(a.getAttributeType())) {
			String name = a.getName();
			String value = bc.map.getString(name);
			int line = bc.info.getStartLine() + 1;
			IRegion vregion = bc.info.getAttrValueRegion2(name);
			if (value.length() == 0) {
				String msg = name + " 不能为空";
				AuroraBuilder.addMarker(bc.file, msg, line, vregion,
						BuildContext.LEVEL_UNDEFINED_SCREEN,
						AuroraBuilder.UNDEFINED_SCREEN);
				return;
			}
			if (!siPattern.matcher(value).matches()) {
				// String msg = value + " 可能不是一个有效的值";
				// AuroraBuilder.addMarker(bc.file, msg, line, vregion,
				// IMarker.SEVERITY_WARNING,
				// AuroraBuilder.UNDEFINED_SCREEN);
				return;
			}
			value = value.split("\\?")[0];
			IContainer webDir = Util.findWebInf(bc.file).getParent();
			IPath path = new Path(value).makeRelativeTo(webDir.getFullPath())
					.makeAbsolute();
			// System.out.println(path);
			IFile findScreenFile = webDir.getFile(path);
			// System.out.println(findScreenFile.getLocation());
			if (findScreenFile != null && findScreenFile.exists())
				return;
			String msg = name + " : " + value + " 不存在";
			AuroraBuilder.addMarker(bc.file, msg, line, vregion,
					BuildContext.LEVEL_UNDEFINED_SCREEN,
					AuroraBuilder.UNDEFINED_SCREEN);
		}
	}

	@Override
	public void processComplete(IFile file, CompositeMap map, IDocument doc) {

	}

}
