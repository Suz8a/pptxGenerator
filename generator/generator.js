var csv = require("csv");
const fs = require("fs");
const PptxGenJS = require("pptxgenjs");

const main = () => {
  const fileData = fs.readFileSync("../data/titulaciones.csv", {
    encoding: "utf-8",
  });

  csv.parse(fileData, { columns: true }, (err, data) => {
    const pptx = new PptxGenJS();
    pptx.layout = "LAYOUT_WIDE";

    var carreras = data
      .map(({ carrera }) => {
        return carrera;
      })
      .reduce((unique, item) => {
        return unique.includes(item) ? unique : [...unique, item];
      }, []);

    carreras.forEach((carreraActual) => {
      console.log();
      data
        .filter(({ carrera }) => carrera === carreraActual)
        .forEach((item) => {
          const slide = pptx.addSlide();

          slide
            .addImage({
              path: `../assets/headers/logo.png`,
              x: "2.5%",
              y: 0,
              w: 2878,
              h: 321,
              sizing: { type: "contain", w: "55%", h: "20%" },
            })
            .addText(
              [
                {
                  text: "Carrera",
                  options: {
                    fontSize: 30,
                    color: "1c3467",
                    bold: true,
                  },
                },
              ],
              {
                x: 0,
                y: "25%",
                w: "60%",
                h: "10%",
                align: "center",
              }
            )
            .addText(
              [
                {
                  text: item["carrera"],
                  options: {
                    fontSize: 25,
                    color: "1c3467",
                  },
                },
              ],
              {
                x: 0,
                y: "38%",
                w: "60%",
                h: "20%",
                align: "center",
              }
            )
            .addText(
              [
                {
                  text: "Generación 2015-2019",
                  options: {
                    fontSize: 30,
                    color: "1c3467",
                    bold: true,
                  },
                },
              ],
              {
                x: 0,
                y: "60%",
                w: "60%",
                h: "10%",
                align: "center",
              }
            )
            .addImage({
              path: `../assets/img/${item["carrera"]}/${
                Object.values(item)[0]
              }.jpeg`,
              x: "60%",
              y: 0,
              w: "40%",
              h: "90%",
              sizing: { type: "contain" },
            })
            .addText(
              [
                {
                  text: item["Nombre"],
                  options: {
                    fontSize: 27,
                    color: "ffffff",
                    bold: true,
                  },
                },
              ],
              {
                x: 0,
                y: "90%",
                w: "100%",
                h: "10%",
                align: "center",
                fill: { color: "1c3467" },
              }
            );
        });
      pptx.writeFile(carreraActual).then(function (fileName) {
        console.log("Saved! File Name: " + fileName);
      });
    });
  });
};

main();
