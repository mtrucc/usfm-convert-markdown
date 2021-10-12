const fs = require('fs-extra');
const path = require('path');

// Usfm folder
const USFMDIR = 'cmn-cu89s_usfm';
// Output folder
const OUTDIR = 'bible';

// Unused
let otherList = ['toc1', 'toc2', 'toc3', 'toc4', 'mt1', 'm'];
// Book id
let idList = ['id'];
// Roll -> H1 -> ## Text
let h1List = ['h'];
// Chapter -> H2 -> ## Text
let h2List = ['c'];
// Title -> H3 -> ### Text
let h3List = ['ms1'];
// Verse -> P -> Text
let pList = ['v'];
// Underscore -> <u>Text</u>
let uList = ['pn', 'add', '+pn'];
// Indentation -> &enspText
let tList = ['q1'];
// New line -> \n
let nList = ['p', 'b'];
// Bold -> ** Text **
let sList = ['s1', 's2'];
// Italic -> *Text
let iList = ['r', 'd', 'sp', 'qs'];
// Footnote
let fList = ['f'];

async function readFile() {
  let fileList = await fs.readdir(USFMDIR);
  for (let index = 0; index < fileList.length; index++) {
    const fileName = fileList[index];
    let filePath = path.join(USFMDIR, fileName);

    // let fileData = await fs.readFile('./02-GENcmn-cu89s.usfm', 'utf8');
    fs.readFile(filePath, 'utf8').then((fileData) => {
      // Split by newline
      let lineList = fileData.split('\n');
      // Parse the usfm file into json format
      let usfmJson = parseUsfm(lineList);
      let { bookCode } = usfmJson;
      let jsonFilePath = path.join(OUTDIR, bookCode, `${bookCode}.json`);
      fs.outputFile(jsonFilePath, '').then(() => {
        fs.writeJson(jsonFilePath, usfmJson);
      });
      generateFile(usfmJson);
    });
  }
}

function generateFile({ bookCode, bookName, chapter }) {
  for (const key in chapter) {
    if (chapter.hasOwnProperty.call(chapter, key)) {
      const element = chapter[key];
      let fileName = `${bookCode}.${key}.html`;
      let outPath = path.join(OUTDIR, bookCode, fileName);
      const header = formatHeader({ header: bookName, number: key });
      let content = formatChapters(element);
      content = formatFooterInChapters(content);
      const footer = formatFooter(element);
      let outputContent = mergeContents({ header, content, footer });
      fs.outputFile(outPath, outputContent);
    }
  }
}

// Return chapter Header
function formatHeader({ header, number }) {
  return `<h2>${header} ${number}</h2>\n`;
}

// Return chapter Ceontent
function formatChapters(chapter) {
  return chapter.content
    .map((e) => {
      let { type, number, format } = e;
      if (type == 'v') {
        return `<p><sup>${number}</sup>${format}</p>`;
      }
      return format;
    })
    .join('\n');
}

// Adding footnotes to comments in content
function formatFooterInChapters(content) {
  let footerRegex =
    /\\f\s+-\s+\\fr\s+(?<footerNumber>\S+)\s+\\ft\s+(?<footerContent>.+)\\f\*/gm;
  return content.replace(
    footerRegex,
    '<sup id="footnotes-ref-$<footerNumber>"><a href="#footnotes-def-$<footerNumber>">注</a></sup>'
  );
}

// Return chapter Footer(footnotes)
function formatFooter(chapter) {
  let footerList = chapter.footer
    .map((e) => {
      let { number, content } = e;
      return `<li id="footnotes-def-${number}"><p><a href="#footnotes-ref-${number}">${number}：${content}</a></p></li>`;
    })
    .join('\n');
  return `<ol>${footerList}</ol>`;
}

// Merge content
function mergeContents({ header, content, footer }) {
  return `${header}${content}${footer}`;
}

// Parsing usfm files
function parseUsfm(lineList) {
  let bookCode = '';
  let bookName = '';
  let other = [];
  let unknown = [];
  let unknownInLine = [];
  let chapter = {};
  let chapterIndex = 0;

  // Regular parsing type
  const regex = /\\(?<type>\S*) ?(?<info>\S*) ?/;

  // Loop through to see if there are any unknown types not to miss the parsing
  for (let index = 0; index < lineList.length; index++) {
    const lineItem = lineList[index];
    let { type, info } = lineItem.match(regex).groups;

    // Parse Book Id
    if (idList.indexOf(type) > -1) {
      bookCode = info;
      continue;
    }

    // Parse Roll
    if (h1List.indexOf(type) > -1) {
      bookName = info;
      continue;
    }

    // Parse Unused
    if (otherList.indexOf(type) > -1) {
      other.push(lineItem);
      continue;
    }

    // Parse Chapter
    if (h2List.indexOf(type) > -1) {
      chapterIndex = info;
      chapter[chapterIndex] = {
        header: [],
        content: [],
        footer: [],
      };
      continue;
    }

    // Parsing chapter content
    if (
      [...pList, ...nList, ...sList, ...tList, ...iList, ...h3List].indexOf(
        type
      ) > -1
    ) {
      let newLineItem = lineItem;
      // Regular Match Type Number Content
      const verseRegex =
        /\\(?<verseType>\S*) ?(?<verseNumber>\S*) ?(?<verseVerse>.*)/;
      // More details in regular match content, such as underscores, footnotes
      const moreRegex = /\\(?!v)(?<moreType>\S*) (.*?)?\\(\1)\*/gm;
      const moreRegexGet = /\\(?!v)(?<moreType>\S*) (.*?)?\\(\1)\*/;
      let { verseType, verseNumber, verseVerse } =
        lineItem.match(verseRegex).groups;

      // More details in the regular match content, such as underscores, footnotes, and if found continue to analyze and process
      let moreRegexList = lineItem.match(moreRegex);
      if (moreRegexList && moreRegexList.length > 0) {
        for (let index = 0; index < moreRegexList.length; index++) {
          const moreRegexListItem = moreRegexList[index];
          let { moreType } = moreRegexListItem.match(moreRegexGet).groups;

          if ([...fList].indexOf(moreType) != -1) {
            let footerRegex =
              /\\f\s+-\s+\\fr\s+(?<footerNumber>\S+)\s+\\ft\s+(?<footerContent>.+)\\f\*/;
            let { footerNumber, footerContent } =
              moreRegexListItem.match(footerRegex).groups;
            let footerItem = {
              content: footerContent,
              number: footerNumber,
              text: moreRegexListItem,
            };
            // Add a footnote
            if (chapter[chapterIndex] && chapter[chapterIndex].footer) {
              chapter[chapterIndex].footer.push(footerItem);
            } else {
              chapter[chapterIndex].footer = [footerItem];
            }
          }

          // Check for unknown types that are not resolved
          if (
            [
              ...pList,
              ...nList,
              ...sList,
              ...tList,
              ...iList,
              ...uList,
              ...fList,
              ...h3List,
            ].indexOf(moreType) == -1
          ) {
            unknownInLine.push(moreRegexListItem);
          }
        }
      }

      // Remove front and back space
      newLineItem = newLineItem.trim();

      // Handling Scripture
      if (pList.indexOf(type) > -1) {
        // Remove trailing spaces but not head spaces
        newLineItem = verseVerse.replace(/(\s*$)/g, '');
        newLineItem = newLineItem.replace(/\\v /gm, '');
        newLineItem = `${newLineItem}`;
      }

      // Handling line feeds
      if (nList.indexOf(type) > -1) {
        newLineItem = newLineItem.replace(/\\p /gm, '');
        newLineItem = newLineItem.replace(/\\p/gm, '');
        newLineItem = newLineItem.replace(/\\b /gm, '');
        newLineItem = newLineItem.replace(/\\b/gm, '');
        newLineItem = `${newLineItem}<br>`;
      }

      // Handling bolded
      if (sList.indexOf(type) > -1) {
        newLineItem = newLineItem.replace(/\\s1 /gm, '');
        newLineItem = newLineItem.replace(/\\s1/gm, '');
        newLineItem = newLineItem.replace(/\\s2 /gm, '');
        newLineItem = newLineItem.replace(/\\s2/gm, '');
        newLineItem = `<strong>${newLineItem}</strong>`;
      }

      // Handling indentations
      if (tList.indexOf(type) > -1) {
        newLineItem = newLineItem.replace(/\\q1 /gm, '');
        newLineItem = newLineItem.replace(/\\q1/gm, '');
        newLineItem = `&ensp;${newLineItem}`;
      }

      // Handling italics
      if (iList.indexOf(type) > -1) {
        newLineItem = newLineItem.replace(/\\r /, '');
        newLineItem = newLineItem.replace(/\\r/, '');
        newLineItem = newLineItem.replace(/\\d /, '');
        newLineItem = newLineItem.replace(/\\d/, '');
        newLineItem = newLineItem.replace(/\\sp /, '');
        newLineItem = newLineItem.replace(/\\sp/, '');
        newLineItem = `<em>${newLineItem}</em>`;
      }

      // Handling H3
      if (h3List.indexOf(type) > -1) {
        newLineItem = newLineItem.replace(/\\ms1 /, '');
        newLineItem = newLineItem.replace(/\\ms1/, '');
        newLineItem = `<h3>${newLineItem}</h3>\n`;
      }

      newLineItem = newLineItem.replace(/\\pn /gm, '<u>');
      newLineItem = newLineItem.replace(/\\pn\*/gm, '</u>');
      newLineItem = newLineItem.replace(/\\add /gm, '<u>');
      newLineItem = newLineItem.replace(/\\add\*/gm, '</u>');
      newLineItem = newLineItem.replace(/\\\+pn /gm, '<u>');
      newLineItem = newLineItem.replace(/\\\+pn\*/gm, '</u>');
      newLineItem = newLineItem.replace(/\\qs /gm, '<em>');
      newLineItem = newLineItem.replace(/\\qs\*/gm, '</em>');
      newLineItem = newLineItem.replace(/\r /gm, '');
      newLineItem = newLineItem.replace(/\r/gm, '');

      // Footnotes in formatted content
      // newLineItem = formatFooterInChapters(newLineItem);

      // Fix the blanks, but don't dare to delete them
      newLineItem = newLineItem.replace(/　/gm, '&ensp;&ensp;');
      // newLineItem = newLineItem.replace(/ /gm, '&ensp;');

      let chapterItem = {
        text: lineItem,
        format: newLineItem,
        number: verseNumber,
        type: verseType,
      };

      if (chapter[chapterIndex] && chapter[chapterIndex].content) {
        chapter[chapterIndex].content.push(chapterItem);
      } else {
        chapter[chapterIndex].content = [chapterItem];
      }
      continue;
    }
    // Check for unknown types that are not resolved
    unknown.push(lineItem);
  }
  console.log(`unknown`, unknown);
  console.log(`unknownInLine`, unknownInLine);
  return { bookCode, bookName, other, unknown, unknownInLine, chapter };
}

readFile();
