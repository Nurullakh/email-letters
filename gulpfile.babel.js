import gulp from "gulp";
import babel from "gulp-babel";
import watch from "gulp-watch";
import log from "fancy-log";
import fs from "fs";
import path from "path";
import mjml2html from "mjml";
import { registerComponent } from "mjml-core";
import folderToHtml from "folder-to-html";

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach((file) => {
    filelist = fs.statSync(path.join(dir, file)).isDirectory()
      ? walkSync(path.join(dir, file), filelist)
      : filelist.concat(path.join(dir, file));
  });
  return filelist;
};

const watchedComponents = walkSync("./component");

let mjmlFiles = walkSync("./pages").filter((file) => {
  return path.extname(file).toLowerCase() === ".mjml";
});

const compile = () => {
  return gulp
    .src(path.normalize("component/*.js"))
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    .on("error", log)
    .pipe(gulp.dest("dist/component"))
    .on("end", () => {
      watchedComponents.forEach((compPath) => {
        const fullPath = path.join(process.cwd(), compPath);
        delete require.cache[fullPath];
        registerComponent(require(fullPath).default);
      });

      fs.stat("dist", (err) => {
        if (err?.code === "ENOENT") {
          fs.mkdirSync("dist");
        }
      });

      mjmlFiles.forEach((compPath) => {
        fs.readFile(path.normalize(compPath), "utf8", (err, data) => {
          if (err) throw err;
          const result = mjml2html(data);
          const name = path.basename(compPath, path.extname(compPath));
          fs.writeFileSync(path.normalize(`./dist/${name}.html`), result.html);
        });
      });
    });
};

function img() {
  return gulp
    .src(`./img/**/*.{png,jpg,gif,svg,mp4}`)
    .pipe(gulp.dest("./dist/img/"));
}

function overview(cd) {
  folderToHtml({
    folder: "./dist/",
    exclude: [/\.git/, /node_modules/],
  });
  cd();
}

exports.build = gulp.series(compile, img, overview);

gulp.task("watch", () => {
  compile();
  return watch(
    [path.normalize("component/**/*.js"), path.normalize("./pages")],
    compile
  );
});
