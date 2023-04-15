const Reader = require("./Reader");
const Processor = require("./Processor");
const Table = require("./Table");
const HtmlParser = require("./HtmlParser");
const Writer = require("./Writer");
const PDFWriter = require("./PDFWriter");

const reader = new Reader();
const writer = new Writer();

async function main() {
    const data = await reader.Read("./users.csv");
    const processedData = Processor.Process(data);

    const users = new Table(processedData);
    const html = await HtmlParser.Parse(users);

    // await writer.Write(Date.now() + ".html", html);
    PDFWriter.WritePDF(Date.now() + ".pdf", html);
    
}

main();