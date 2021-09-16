# Usfm Convert Markdown

This is an immature conversion script that converts **[usfm](https://ubsicap.github.io/usfm/)** files to **[markdown](https://www.markdownguide.org/)** files, and json files containing more information.

## Use

```bash
npm i
node index.js
```

## Out

Usfm file

```
\id GEN Chinese-Simplified Script: Chinese Union New Punctuation 1989 
\h 创世记 
\toc1 创世记 
\toc2 创世记 
\mt1 创世记 
\c 1  
\s1 　神的创造 
\p
\v 1 起初，　神创造天地。 
\v 2 地是空虚混沌，渊面黑暗；　神的灵运行在水面上。 
\p
\v 3 　神说：「要有光」，就有了光。 
\v 4 　神看光是好的，就把光暗分开了。 
\v 5 　神称光为「昼」，称暗为「夜」。有晚上，有早晨，这是头一日。 
\p
\v 6 　神说：「诸水之间要有空气，将水分为上下。」 
\v 7 　神就造出空气，将空气以下的水、空气以上的水分开了。事就这样成了。 
\v 8 　神称空气为「天」。有晚上，有早晨，是第二日。 
\p
\v 9 　神说：「天下的水要聚在一处，使旱地露出来。」事就这样成了。 
\v 10 　神称旱地为「地」，称水的聚处为「海」。　神看着是好的。 
\v 11 　神说：「地要发生青草和结种子的菜蔬，并结果子的树木，各从其类，果子都包着核。」事就这样成了。 
\v 12 于是地发生了青草和结种子的菜蔬，各从其类；并结果子的树木，各从其类；果子都包着核。　神看着是好的。 
\v 13 有晚上，有早晨，是第三日。 
```

Markdown file

```markdown
## 创世记 1 

**&ensp;&ensp;神的创造**


<sup>1</sup>起初，&ensp;&ensp;神创造天地。

<sup>2</sup>地是空虚混沌，渊面黑暗；&ensp;&ensp;神的灵运行在水面上。


<sup>3</sup>&ensp;&ensp;神说：「要有光」，就有了光。

<sup>4</sup>&ensp;&ensp;神看光是好的，就把光暗分开了。

<sup>5</sup>&ensp;&ensp;神称光为「昼」，称暗为「夜」。有晚上，有早晨，这是头一日。


<sup>6</sup>&ensp;&ensp;神说：「诸水之间要有空气，将水分为上下。」

<sup>7</sup>&ensp;&ensp;神就造出空气，将空气以下的水、空气以上的水分开了。事就这样成了。

<sup>8</sup>&ensp;&ensp;神称空气为「天」。有晚上，有早晨，是第二日。


<sup>9</sup>&ensp;&ensp;神说：「天下的水要聚在一处，使旱地露出来。」事就这样成了。

<sup>10</sup>&ensp;&ensp;神称旱地为「地」，称水的聚处为「海」。&ensp;&ensp;神看着是好的。

<sup>11</sup>&ensp;&ensp;神说：「地要发生青草和结种子的菜蔬，并结果子的树木，各从其类，果子都包着核。」事就这样成了。

<sup>12</sup>于是地发生了青草和结种子的菜蔬，各从其类；并结果子的树木，各从其类；果子都包着核。&ensp;&ensp;神看着是好的。

<sup>13</sup>有晚上，有早晨，是第三日。
```

Json File

```json
{
  "bookCode": "GEN",
  "bookName": "创世记",
  "other": [
    "\\toc1 创世记 \r",
    "\\toc2 创世记 \r",
    "\\mt1 创世记 \r",
    "\\m\r"
  ],
  "unknown": [],
  "unknownInLine": [],
  "chapter": {
    "1": {
      "header": [],
      "content": [
        {
          "text": "\\s1 　神的创造 \r",
          "format": "**&ensp;&ensp;神的创造**\n\n",
          "number": "",
          "type": "s1"
        },
        {
          "text": "\\p\r",
          "format": "\n",
          "number": "",
          "type": "p"
        },
        {
          "text": "\\v 1 起初，　神创造天地。 \r",
          "format": "起初，&ensp;&ensp;神创造天地。\n\n",
          "number": "1",
          "type": "v"
        },
        {
          "text": "\\v 2 地是空虚混沌，渊面黑暗；　神的灵运行在水面上。 \r",
          "format": "地是空虚混沌，渊面黑暗；&ensp;&ensp;神的灵运行在水面上。\n\n",
          "number": "2",
          "type": "v"
        },
        {
          "text": "\\p\r",
          "format": "\n",
          "number": "",
          "type": "p"
        },
        {
          "text": "\\v 3 　神说：「要有光」，就有了光。 \r",
          "format": "&ensp;&ensp;神说：「要有光」，就有了光。\n\n",
          "number": "3",
          "type": "v"
        },
        {
          "text": "\\v 4 　神看光是好的，就把光暗分开了。 \r",
          "format": "&ensp;&ensp;神看光是好的，就把光暗分开了。\n\n",
          "number": "4",
          "type": "v"
        },
        {
          "text": "\\v 5 　神称光为「昼」，称暗为「夜」。有晚上，有早晨，这是头一日。 \r",
          "format": "&ensp;&ensp;神称光为「昼」，称暗为「夜」。有晚上，有早晨，这是头一日。\n\n",
          "number": "5",
          "type": "v"
        },
        {
          "text": "\\p\r",
          "format": "\n",
          "number": "",
          "type": "p"
        },
        {
          "text": "\\v 6 　神说：「诸水之间要有空气，将水分为上下。」 \r",
          "format": "&ensp;&ensp;神说：「诸水之间要有空气，将水分为上下。」\n\n",
          "number": "6",
          "type": "v"
        },
        {
          "text": "\\v 7 　神就造出空气，将空气以下的水、空气以上的水分开了。事就这样成了。 \r",
          "format": "&ensp;&ensp;神就造出空气，将空气以下的水、空气以上的水分开了。事就这样成了。\n\n",
          "number": "7",
          "type": "v"
        },
        {
          "text": "\\v 8 　神称空气为「天」。有晚上，有早晨，是第二日。 \r",
          "format": "&ensp;&ensp;神称空气为「天」。有晚上，有早晨，是第二日。\n\n",
          "number": "8",
          "type": "v"
        },
        {
          "text": "\\p\r",
          "format": "\n",
          "number": "",
          "type": "p"
        },
        {
          "text": "\\v 9 　神说：「天下的水要聚在一处，使旱地露出来。」事就这样成了。 \r",
          "format": "&ensp;&ensp;神说：「天下的水要聚在一处，使旱地露出来。」事就这样成了。\n\n",
          "number": "9",
          "type": "v"
        },
        {
          "text": "\\v 10 　神称旱地为「地」，称水的聚处为「海」。　神看着是好的。 \r",
          "format": "&ensp;&ensp;神称旱地为「地」，称水的聚处为「海」。&ensp;&ensp;神看着是好的。\n\n",
          "number": "10",
          "type": "v"
        },
        {
          "text": "\\v 11 　神说：「地要发生青草和结种子的菜蔬，并结果子的树木，各从其类，果子都包着核。」事就这样成了。 \r",
          "format": "&ensp;&ensp;神说：「地要发生青草和结种子的菜蔬，并结果子的树木，各从其类，果子都包着核。」事就这样成了。\n\n",
          "number": "11",
          "type": "v"
        },
        {
          "text": "\\v 12 于是地发生了青草和结种子的菜蔬，各从其类；并结果子的树木，各从其类；果子都包着核。　神看着是好的。 \r",
          "format": "于是地发生了青草和结种子的菜蔬，各从其类；并结果子的树木，各从其类；果子都包着核。&ensp;&ensp;神看着是好的。\n\n",
          "number": "12",
          "type": "v"
        },
        {
          "text": "\\v 13 有晚上，有早晨，是第三日。 \r",
          "format": "有晚上，有早晨，是第三日。\n\n",
          "number": "13",
          "type": "v"
        }
      ],
      "footer": []
    }
  }
}
```