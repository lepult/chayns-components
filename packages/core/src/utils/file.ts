interface FilerDuplicateFileOptions {
    files: File[];
    newFile: File;
}

export const filterDuplicateFile = ({ newFile, files }: FilerDuplicateFileOptions) => {
    const duplicates = files.filter(
        (fileItem) => fileItem && fileItem.name === newFile.name && fileItem.size === newFile.size,
    );

    return duplicates.length > 0;
};

interface FilterDuplicateFileUrlsOptions {
    files: string[];
    newFile: string;
}

export const filterDuplicateFileUrls = ({ newFile, files }: FilterDuplicateFileUrlsOptions) => {
    const duplicates = files.filter((fileItem) => fileItem === newFile);

    return duplicates.length > 0;
};

const FILE_SIZE_UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];

export const getHumanSize = (bytes: number): string => {
    let size = bytes || 0;
    let unitIndex = 0;

    while (size >= 1024) {
        size /= 1024;
        unitIndex += 1;
    }

    size = Math.round(size * 10) / 10;

    return `${size.toString().replace('.', ',')} ${FILE_SIZE_UNITS[unitIndex] ?? ''}`;
};

interface IsValidFileTypeOptions {
    file: File;
    types: string;
}

export const isValidFileType = ({ types, file }: IsValidFileTypeOptions) => {
    const allowedTypesArray = types.split(',').map((type) => type.trim());
    const fileType = file.type;

    return allowedTypesArray.some((type) => {
        if (type.endsWith('/*')) {
            const baseType = type.slice(0, -2); // remove '/*'
            return fileType.startsWith(baseType);
        }
        return fileType === type;
    });
};

export const MIME_TYPE_MAPPING = {
    // Excel
    'application/vnd.ms-excel': 'fa fa-file-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'fa fa-file-excel',
    'application/vnd.ms-excel.sheet.macroEnabled.12': 'fa fa-file-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.template': 'fa fa-file-excel',
    'application/vnd.ms-excel.template.macroEnabled.12': 'fa fa-file-excel',
    'application/vnd.ms-excel.addin.macroEnabled.12': 'fa fa-file-excel',
    'application/vnd.ms-excel.sheet.binary.macroEnabled.12': 'fa fa-file-excel',
    'application/msexcel': 'fa fa-file-excel',
    'application/x-msexcel': 'fa fa-file-excel',
    'application/x-ms-excel': 'fa fa-file-excel',
    'application/x-excel': 'fa fa-file-excel',
    'application/x-dos_ms_excel': 'fa fa-file-excel',
    'application/xls': 'fa fa-file-excel',
    'application/x-xls': 'fa fa-file-excel',
    'application/vnd.ms-excel.sheet': 'fa fa-file-excel',
    'appliaction/msexcel': 'fa fa-file-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml': 'fa fa-file-excel',
    'application/vnd.oasis.opendocument.spreadsheet': 'fa fa-file-excel',

    // Word
    'application/msword': 'fa fa-file-word',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'fa fa-file-word',
    'application/vnd.ms-word.document.macroEnabled.12': 'fa fa-file-word',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.template': 'fa fa-file-word',
    'application/vnd.ms-word.template.macroEnabled.12': 'fa fa-file-word',
    'application/doc': 'fa fa-file-word',
    'application/vnd.ms-word': 'fa fa-file-word',
    'application/vnd.ms-word.document.macroEnabled': 'fa fa-file-word',
    'application/vnd.ms-word.template.macroEnabled': 'fa fa-file-word',
    'application/word': 'fa fa-file-word',
    'application/x-msword': 'fa fa-file-word',
    'application/x-msword-template': 'fa fa-file-word',
    'application/vnd.ms-word.document': 'fa fa-file-word',
    'application/rtf': 'fa fa-file-word',
    'application/vnd.oasis.opendocument.text': 'fa fa-file-word',
    'application/vnd.openxmlformats-officedocument.wordprocessingml': 'fa fa-file-word',

    // PDF
    'application/pdf': 'fa fa-file-pdf',
    'application/x-pdf': 'fa fa-file-pdf',
    'application/vnd.pdf': 'fa fa-file-pdf',
    'text/pdf': 'fa fa-file-pdf',
    'application/x-bzpdf': 'fa fa-file-pdf',
    'application/x-gzpdf': 'fa fa-file-pdf',
    'application/x-xzpdf': 'fa fa-file-pdf',
    'application/vnd.adobe.pdf': 'fa fa-file-pdf',
    'application/vnd.adobe.x-mars': 'fa fa-file-pdf',
    'application/vnd.fdf': 'fa fa-file-pdf',
    'application/vnd.adobe.xfdf': 'fa fa-file-pdf',
    'application/vnd.adobe.xdp+xml': 'fa fa-file-pdf',
    'application/vnd.adobe.xfd+xml': 'fa fa-file-pdf',
    'application/vnd.adobe.xslfo+xml': 'fa fa-file-pdf',
    'application/vnd.adobe.pdx': 'fa fa-file-pdf',
    'application/vnd.adobe.xsp+xml': 'fa fa-file-pdf',
    'application/vnd.adobe.xp+xml': 'fa fa-file-pdf',
    'application/vnd.adobe.xpp+xml': 'fa fa-file-pdf',
    'application/vnd.adobe.xdp+zip': 'fa fa-file-pdf',
    'application/vnd.adobe.xfd+zip': 'fa fa-file-pdf',
    'application/vnd.adobe.xfdf+zip': 'fa fa-file-pdf',
    'application/vnd.adobe.xslt+xml': 'fa fa-file-pdf',
    'application/vnd.adobe.xfm+xml': 'fa fa-file-pdf',
    'application/vnd.adobe.xsf+xml': 'fa fa-file-pdf',
    'application/vnd.adobe.xdpxml': 'fa fa-file-pdf',
    'application/vnd.adobe.xfa': 'fa fa-file-pdf',
    'application/vnd.adobe.xpinstall': 'fa fa-file-pdf',
    'application/vnd.adobe.xquery': 'fa fa-file-pdf',
    'application/vnd.adobe.xrd+xml': 'fa fa-file-pdf',
    'application/vnd.adobe.xspf+xml': 'fa fa-file-pdf',
    'application/vnd.adobe.xliff+xml': 'fa fa-file-pdf',
    'application/vnd.adobe.xfdf+xml': 'fa fa-file-pdf',
    'application/vnd.adobe.xmp+xml': 'fa fa-file-pdf',
    'application/vnd.adobe.xmp+zip': 'fa fa-file-pdf',
    'application/vnd.adobe.xna+xml': 'fa fa-file-pdf',
    'application/vnd.adobe.cif+xml': 'fa fa-file-pdf',
    'application/vnd.adobe.edn+xml': 'fa fa-file-pdf',
    'application/vnd.adobe.eps': 'fa fa-file-pdf',
    'application/vnd.adobe.encase.package+xml': 'fa fa-file-pdf',
    'application/vnd.adobe.flash.movie': 'fa fa-file-pdf',
    'application/vnd.adobe.formscentral.fcdt': 'fa fa-file-pdf',
    'application/vnd.adobe.illustrator': 'fa fa-file-pdf',
    'application/vnd.adobe.flash-movie': 'fa fa-file-pdf',
    'application/vnd.adobe.air-application-installer-package+zip': 'fa fa-file-pdf',

    // Zip
    'application/zip': 'fa fa-file-archive',
    'application/x-rar-compressed': 'fa fa-file-archive',
    'application/x-tar': 'fa fa-file-archive',
    'application/x-7z-compressed': 'fa fa-file-archive',
    'application/x-gzip': 'fa fa-file-archive',
    'application/x-bzip2': 'fa fa-file-archive',
    'application/x-xz': 'fa fa-file-archive',
    'application/x-zip-compressed': 'fa fa-file-archive',
    'application/java-archive': 'fa fa-file-archive',
    'application/vnd.ms-cab-compressed': 'fa fa-file-archive',
    'application/x-ace-compressed': 'fa fa-file-archive',
    'application/x-apple-diskimage': 'fa fa-file-archive',
    'application/x-stuffit': 'fa fa-file-archive',
    'application/x-deb': 'fa fa-file-archive',
    'application/x-lzip': 'fa fa-file-archive',
    'application/x-lzma': 'fa fa-file-archive',
    'application/x-lz4': 'fa fa-file-archive',
    'application/x-arj': 'fa fa-file-archive',
    'application/x-gtar': 'fa fa-file-archive',
    'application/x-gtar-compressed': 'fa fa-file-archive',
    'application/x-compress': 'fa fa-file-archive',
    'application/x-bzip': 'fa fa-file-archive',
    'application/x-bzip2-compressed-tar': 'fa fa-file-archive',
    'application/x-iso9660-image': 'fa fa-file-archive',
    'application/x-nrg': 'fa fa-file-archive',
    'application/x-cpio': 'fa fa-file-archive',
    'application/x-rpm': 'fa fa-file-archive',
    'application/x-msdownload': 'fa fa-file-archive',
    'application/x-ace': 'fa fa-file-archive',
    'application/x-gca-compressed': 'fa fa-file-archive',
    'application/x-java-pack200': 'fa fa-file-archive',
    'application/x-tarz': 'fa fa-file-archive',
    'application/x-vhd': 'fa fa-file-archive',
    'application/x-virtualbox-hdd': 'fa fa-file-archive',
    'application/x-lha': 'fa fa-file-archive',
    'application/x-lzx': 'fa fa-file-archive',
    'application/x-nsis': 'fa fa-file-archive',
    'application/x-sit': 'fa fa-file-archive',
    'application/x-squashfs': 'fa fa-file-archive',
    'application/x-tzo': 'fa fa-file-archive',
    'application/x-lzh-compressed': 'fa fa-file-archive',
    'application/x-xar': 'fa fa-file-archive',
    'application/x-war': 'fa fa-file-archive',
    'application/x-cfs-compressed': 'fa fa-file-archive',
    'application/x-zoo': 'fa fa-file-archive',
    'application/x-ice': 'fa fa-file-archive',
    'application/x-b1': 'fa fa-file-archive',
    'application/x-arc': 'fa fa-file-archive',
    'application/x-uc2': 'fa fa-file-archive',
    'application/x-gzcompressed': 'fa fa-file-archive',
    'application/x-cab-compressed': 'fa fa-file-archive',
    'application/x-egg': 'fa fa-file-archive',
    'application/x-ipynb+zip': 'fa fa-file-archive',
    'application/x-iso9660-appimage': 'fa fa-file-archive',
    'application/x-java-archive-diff': 'fa fa-file-archive',
    'application/x-lhz': 'fa fa-file-archive',
    'application/x-ms-wim': 'fa fa-file-archive',
    'application/x-rar': 'fa fa-file-archive',
    'application/x-sfx': 'fa fa-file-archive',
    'application/x-shar': 'fa fa-file-archive',
    'application/x-tar-gz': 'fa fa-file-archive',
    'application/x-tar-bz2': 'fa fa-file-archive',
    'application/x-tar-xz': 'fa fa-file-archive',
    'application/x-tar-z': 'fa fa-file-archive',
    'application/x-tar-zstd': 'fa fa-file-archive',
    'application/x-tar.lz': 'fa fa-file-archive',
    'application/x-tar.lzo': 'fa fa-file-archive',
    'application/x-ustar': 'fa fa-file-archive',
    'application/x-wim': 'fa fa-file-archive',
    'application/x-xpinstall': 'fa fa-file-archive',
    'application/x-xz-compressed-tar': 'fa fa-file-archive',
    'application/xz-compressed-tar': 'fa fa-file-archive',
    'application/x-zip': 'fa fa-file-archive',
    'application/x-zip-sfx': 'fa fa-file-archive',
    'application/x-zipx': 'fa fa-file-archive',
    'application/xz': 'fa fa-file-archive',
    'application/zlib': 'fa fa-file-archive',
    'application/vnd.apple.installer+xml': 'fa fa-file-archive',
    'application/vnd.debian.binary-package': 'fa fa-file-archive',
    'application/vnd.ms-office.addin.macroEnabled.12': 'fa fa-file-archive',
    'application/vnd.ms-office.activex+xml': 'fa fa-file-archive',
    'application/vnd.ms-pki.seccat': 'fa fa-file-archive',
    'application/vnd.ms-pki.stl': 'fa fa-file-archive',
    'application/vnd.ms-powerpoint.addin.macroEnabled.12': 'fa fa-file-archive',
    'application/vnd.ms-powerpoint.presentation.macroEnabled.12': 'fa fa-file-archive',
    'application/vnd.ms-powerpoint.slide.macroEnabled.12': 'fa fa-file-archive',
    'application/vnd.ms-powerpoint.slideshow.macroEnabled.12': 'fa fa-file-archive',
    'application/vnd.ms-powerpoint.template.macroEnabled.12': 'fa fa-file-archive',
    'application/vnd.ms-visio.drawing': 'fa fa-file-archive',
    'application/vnd.ms-visio.drawing.macroEnabled.12': 'fa fa-file-archive',
    'application/vnd.ms-visio.stencil': 'fa fa-file-archive',
    'application/vnd.ms-visio.stencil.macroEnabled.12': 'fa fa-file-archive',
    'application/vnd.ms-visio.template': 'fa fa-file-archive',
    'application/vnd.ms-visio.template.macroEnabled.12': 'fa fa-file-archive',
    'application/vnd.ms-xpsdocument': 'fa fa-file-archive',
    'application/octet-stream': 'fa fa-file-archive',
    'application/gzip': 'fa fa-file-archive',

    // PowerPoint
    'application/vnd.ms-powerpoint': 'fa fa-file-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation':
        'fa fa-file-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.slideshow':
        'fa fa-file-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.template':
        'fa fa-file-powerpoint',
    'application/vnd.ms-powerpoint.slide+xml': 'fa fa-file-powerpoint',
    'application/vnd.ms-powerpoint.slide.show+xml': 'fa fa-file-powerpoint',
    'application/vnd.ms-powerpoint.slide.show.macroEnabled.12': 'fa fa-file-powerpoint',
    'application/vnd.ms-powerpoint.slideLayout+xml': 'fa fa-file-powerpoint',
    'application/vnd.ms-powerpoint.slideMaster+xml': 'fa fa-file-powerpoint',
    'application/vnd.ms-powerpoint.slideshow+xml': 'fa fa-file-powerpoint',
    'application/vnd.ms-powerpoint.template+xml': 'fa fa-file-powerpoint',
    'application/vnd.ms-powerpoint.presentation+xml': 'fa fa-file-powerpoint',
    'application/vnd.ms-powerpoint.addin+xml': 'fa fa-file-powerpoint',
    'application/vnd.ms-powerpoint.presentation.macroEnabled+xml': 'fa fa-file-powerpoint',
    'application/vnd.ms-powerpoint.presentation.main+xml': 'fa fa-file-powerpoint',
    'application/vnd.ms-powerpoint.slide.show.macroEnabled+xml': 'fa fa-file-powerpoint',
    'application/vnd.ms-powerpoint.template.macroEnabled+xml': 'fa fa-file-powerpoint',
    'application/x-mspowerpoint': 'fa fa-file-powerpoint',
    'application/x-ms-powerpoint': 'fa fa-file-powerpoint',
    'application/mspowerpoint': 'fa fa-file-powerpoint',
    'application/ppt': 'fa fa-file-powerpoint',
    'application/vnd.ms-ppt': 'fa fa-file-powerpoint',
    'application/powerpoint': 'fa fa-file-powerpoint',
    'application/x-ppt': 'fa fa-file-powerpoint',
    'application/pptx': 'fa fa-file-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.slide': 'fa fa-file-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml':
        'fa fa-file-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml':
        'fa fa-file-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml':
        'fa fa-file-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml':
        'fa fa-file-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml': 'fa fa-file-powerpoint',
    'application/vnd.oasis.opendocument.presentation': 'fa fa-file-powerpoint',

    // Text
    'text/plain': 'fa fa-file-alt',

    // CSV
    'text/csv': 'fa fa-file-csv',
    'application/csv': 'fa fa-file-csv',
    'application/x-csv': 'fa fa-file-csv',
    'text/comma-separated-values': 'fa fa-file-csv',
    'text/x-comma-separated-values': 'fa fa-file-csv',
    'text/tab-separated-values': 'fa fa-file-csv',
    'application/x-sqlite3': 'fa fa-file-csv',
    'application/vnd.oasis.opendocument.graphics': 'fa fa-file-csv',
    'application/vnd.oasis.opendocument.chart': 'fa fa-file-csv',
    'application/vnd.oasis.opendocument.database': 'fa fa-file-csv',
    'application/vnd.oasis.opendocument.formula': 'fa fa-file-csv',
    'application/vnd.oasis.opendocument.image': 'fa fa-file-csv',
    'application/vnd.oasis.opendocument.text-master': 'fa fa-file-csv',
    'application/vnd.oasis.opendocument.presentation-master': 'fa fa-file-csv',
    'application/vnd.oasis.opendocument.spreadsheet-template': 'fa fa-file-csv',
    'application/vnd.oasis.opendocument.text-template': 'fa fa-file-csv',
    'application/vnd.oasis.opendocument.presentation-template': 'fa fa-file-csv',
    'application/vnd.oasis.opendocument.graphics-template': 'fa fa-file-csv',
    'application/vnd.oasis.opendocument.chart-template': 'fa fa-file-csv',
    'application/vnd.oasis.opendocument.database-template': 'fa fa-file-csv',
    'application/vnd.oasis.opendocument.formula-template': 'fa fa-file-csv',
    'application/vnd.oasis.opendocument.image-template': 'fa fa-file-csv',
    'application/vnd.sun.xml.writer': 'fa fa-file-csv',
    'application/vnd.sun.xml.writer.template': 'fa fa-file-csv',
    'application/vnd.sun.xml.calc': 'fa fa-file-csv',
    'application/vnd.sun.xml.calc.template': 'fa fa-file-csv',
    'application/vnd.sun.xml.impress': 'fa fa-file-csv',
    'application/vnd.sun.xml.impress.template': 'fa fa-file-csv',
    'application/vnd.sun.xml.draw': 'fa fa-file-csv',
    'application/vnd.sun.xml.draw.template': 'fa fa-file-csv',
    'application/vnd.sun.xml.math': 'fa fa-file-csv',

    // Code
    'text/x-sass': 'fa fa-file-code',
    'text/x-scheme': 'fa fa-file-code',
    'text/x-scons': 'fa fa-file-code',
    'text/x-stsrc': 'fa fa-file-code',
    'text/x-tcl': 'fa fa-file-code',
    'text/x-tex': 'fa fa-file-code',
    'text/x-texinfo': 'fa fa-file-code',
    'text/x-toml': 'fa fa-file-code',
    'text/x-uuencode': 'fa fa-file-code',
    'text/x-vala': 'fa fa-file-code',
    'text/x-vbdotnet': 'fa fa-file-code',
    'text/x-vbnet': 'fa fa-file-code',
    'text/x-verilog': 'fa fa-file-code',
    'text/x-vhdl': 'fa fa-file-code',
    'text/x-yaml': 'fa fa-file-code',
    'application/x-gnuplot': 'fa fa-file-code',
    'application/x-haml': 'fa fa-file-code',
    'application/x-ini': 'fa fa-file-code',
    'application/x-mumps': 'fa fa-file-code',
    'application/x-ocaml': 'fa fa-file-code',
    'application/x-ooc': 'fa fa-file-code',
    'application/x-patch': 'fa fa-file-code',
    'application/x-prolog': 'fa fa-file-code',
    'application/x-properties': 'fa fa-file-code',
    'application/x-rsrc': 'fa fa-file-code',
    'application/x-sass': 'fa fa-file-code',
    'application/x-scheme': 'fa fa-file-code',
    'application/x-scons': 'fa fa-file-code',
    'application/x-stsrc': 'fa fa-file-code',
    'application/x-tcl': 'fa fa-file-code',
    'application/x-tex': 'fa fa-file-code',
    'application/x-texinfo': 'fa fa-file-code',
    'application/x-toml': 'fa fa-file-code',
    'application/x-uuencode': 'fa fa-file-code',
    'application/x-vala': 'fa fa-file-code',
    'application/x-vbdotnet': 'fa fa-file-code',
    'application/x-vbnet': 'fa fa-file-code',
    'application/x-vhdl': 'fa fa-file-code',
    'application/x-verilog': 'fa fa-file-code',
    'application/x-yaml': 'fa fa-file-code',
    'text/x-arduino': 'fa fa-file-code',
    'text/x-bibtex': 'fa fa-file-code',
    'text/x-coffeescript': 'fa fa-file-code',
    'text/x-dtd': 'fa fa-file-code',
    'text/x-erlang': 'fa fa-file-code',
    'text/x-gnuplot': 'fa fa-file-code',
    'text/x-go': 'fa fa-file-code',
    'text/x-gwt-rpc': 'fa fa-file-code',
    'text/x-handlebars': 'fa fa-file-code',
    'text/x-haml': 'fa fa-file-code',
    'text/x-ini': 'fa fa-file-code',
    'text/x-json': 'fa fa-file-code',
    'text/x-kotlin': 'fa fa-file-code',
    'text/x-liquid': 'fa fa-file-code',
    'text/x-literate-haskell': 'fa fa-file-code',
    'text/x-lua': 'fa fa-file-code',
    'text/x-makefile': 'fa fa-file-code',
    'text/x-nfo': 'fa fa-file-code',
    'text/x-ocaml': 'fa fa-file-code',
    'text/x-ooc': 'fa fa-file-code',
    'text/x-patch': 'fa fa-file-code',
    'text/x-prolog': 'fa fa-file-code',
    'text/x-properties': 'fa fa-file-code',
    'text/x-rsrc': 'fa fa-file-code',
    'text/x-rust': 'fa fa-file-code',
    'text/html': 'fa fa-file-code',
    'text/css': 'fa fa-file-code',
    'text/javascript': 'fa fa-file-code',
    'application/javascript': 'fa fa-file-code',
    'application/json': 'fa fa-file-code',
    'application/xml': 'fa fa-file-code',
    'application/xhtml+xml': 'fa fa-file-code',
    'application/atom+xml': 'fa fa-file-code',
    'application/rss+xml': 'fa fa-file-code',
    'application/x-latex': 'fa fa-file-code',
    'application/x-sh': 'fa fa-file-code',
    'application/x-python': 'fa fa-file-code',
    'application/x-perl': 'fa fa-file-code',
    'application/x-ruby': 'fa fa-file-code',
    'application/x-php': 'fa fa-file-code',
    'application/x-java': 'fa fa-file-code',
    'application/x-c++': 'fa fa-file-code',
    'application/x-c': 'fa fa-file-code',
    'application/x-shellscript': 'fa fa-file-code',
    'application/x-diff': 'fa fa-file-code',
    'application/x-go': 'fa fa-file-code',
    'application/x-swift': 'fa fa-file-code',
    'application/x-objective-c': 'fa fa-file-code',
    'application/x-scala': 'fa fa-file-code',
    'application/x-rust': 'fa fa-file-code',
    'application/x-haskell': 'fa fa-file-code',
    'application/x-lua': 'fa fa-file-code',
    'application/x-matlab': 'fa fa-file-code',
    'application/x-fortran': 'fa fa-file-code',
    'application/x-csharp': 'fa fa-file-code',
    'application/x-vb': 'fa fa-file-code',
    'application/x-pascal': 'fa fa-file-code',
    'application/x-cobol': 'fa fa-file-code',
    'application/x-groovy': 'fa fa-file-code',
    'application/x-sql': 'fa fa-file-code',
    'application/x-typescript': 'fa fa-file-code',
    'application/x-kotlin': 'fa fa-file-code',
    'application/x-erlang': 'fa fa-file-code',
    'application/x-clojure': 'fa fa-file-code',
    'application/x-less': 'fa fa-file-code',
    'application/x-stylus': 'fa fa-file-code',
    'application/x-markdown': 'fa fa-file-code',
    'application/x-coffeescript': 'fa fa-file-code',
    'application/x-dart': 'fa fa-file-code',
    'application/x-lisp': 'fa fa-file-code',
    'application/x-powershell': 'fa fa-file-code',

    // Images
    image: 'fa fa-file-image',
    // Audio
    audio: 'fa fa-file-audio',
    // Video
    video: 'fa fa-file-video',
};

export const getIconByMimeType = (mimeType?: string): string => {
    const icon = Object.entries(MIME_TYPE_MAPPING).find(([key]) => mimeType?.startsWith(key));

    return icon?.[1] ?? 'fa fa-file';
};
