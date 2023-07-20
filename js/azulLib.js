class HtmlPage {
    constructor () {
    }

    init(pgObj) {

      let divMain = document.createElement('div');
      this.divMain = divMain;
      Object.assign(divMain,pgObj.mainDiv);
      Object.assign(divMain.style,pgObj.mainDiv.style);
      document.body.appendChild(divMain);

      let header = document.createElement('header');
      Object.assign(header,pgObj.header);
      Object.assign(header.style,pgObj.header.style);
      this.header = header;
//    this.addHead('header',header);
      divMain.appendChild(header);

      let doc = document.createElement('section');
      Object.assign(doc,pgObj.section);
      Object.assign(doc.style,pgObj.section.style);
      this.doc = doc;
//    this.addHead('docmain',doc);
      divMain.appendChild(doc);

      let footer = document.createElement('footer');
      Object.assign(footer,pgObj.footer);
      Object.assign(footer.style,pgObj.footer.style);
      this.footer = footer;
//    this.addHead('footer',footer);
      divMain.appendChild(footer);
    }

    addElement(elObj) {
//      console.log('elObj: ', + elObj);
        let el = document.createElement(elObj.typ);
        Object.assign(el,elObj);
        Object.assign(el.style,elObj.style);
        elObj.parent.append(el);
        return el;
    }

    addMeta(metaObj) {
        const headEl = document.head;
        let metaEl = document.createElement('meta');
        metaEl.setAttribute('charset','UTF-8');
        headEl.appendChild(metaEl);

        for (let i=0; i<metaObj.metaNames.length; i++) {
            let metaEl = document.createElement('meta');
            metaEl.name = metaObj.metaNames[i].name;
            metaEl.content = metaObj.metaNames[i].content;
            headEl.appendChild(metaEl);
        }

    }

    addLink(linkObj) {
        const headEl = document.head;
        let linkEl = document.createElement('link');
        let keys = Object.keys(linkObj);
        for (let i=0; i< keys.length; i++) {
            let key = keys[i];
            linkEl.setAttribute(key, linkObj[key])
        }
        headEl.appendChild(linkEl);
    }

    addScript(url) {
        if (!(url.length>0)) {return}
        let scriptEl = document.createElement('script');
        scriptEl.type = 'text/javascript';
        scriptEl.async = true;
        scriptEl.src = url;
        document.head.appendChild(scriptEl);
    }

    addStyles(stylObj) {
        const styleEl = document.createElement('style');
        styleEl.type = 'text/css';

        document.head.appendChild(styleEl);

        let styleSheet = styleEl.sheet;
        let rulenum = styleSheet.cssRules.length;
        styleSheet.insertRule('* { margin: 0; padding: 0; font-family: Calibri; list-style: none; text-decoration:none; font-size: 20pt;}', rulenum);
//      	let rulenum2 = styleSheet.cssRules.length;
//      console.log('rules2: ' + rulenum2);
    }
}

  class htmlWidget {
    constructor () {
    }

    button(butObj) {
        let butEl = document.createElement('button');
        Object.assign(butEl,butObj);
        Object.assign(butEl.style,butObj.style);
//      butEl.style = butObj.style;
        butEl.state = true;
        butEl.hovAtts = Object.keys(butObj.hovStyl);
        butEl.addEventListener('mouseover',(event)=>{butElHov(event);});
        butEl.addEventListener('mouseleave',(event)=>{butElLeave(event, butEl);});
        butEl.addEventListener('click',(event)=>{butElClick(event);});
//      butEl.addEventListener('click',(event)=>{butObj.click(event,butObj.p1);});
        butObj.parent.append(butEl);
        return butEl;

        function  butElHov(e) {
//  console.log('butEl hovering');
            for (let i=0; i<e.target.hovAtts.length; i++) {
                let prop = e.target.hovAtts[i];
//              console.log('keys: ' + prop + '\n');
                e.target.style[prop] = butObj.hovStyl[prop];
            }
            e.target.style.cursor = 'pointer';
        }

        function  butElLeave(e, el) {
//  console.log('butEl leaving');
//        Object.assign(el.style,butObj.style);

            for (let i=0; i<e.target.hovAtts.length; i++) {
                let prop = e.target.hovAtts[i];
                if (e.target.state) {
                    e.target.style[prop] = butObj.style[prop];
                } else {
                    e.target.style[prop] = butObj.altStyl[prop];
                }
            }
            el.style.cursor = 'default';

        }

        function  butElClick(e) {
            e.target.state = !e.target.state;
            for (let i=0; i<e.target.hovAtts.length; i++) {
                let prop = e.target.hovAtts[i];
                if (e.target.state) {
                    e.target.style[prop] = butObj.style[prop];
                } else {
                    e.target.style[prop] = butObj.altStyl[prop];
                }
            }
        } //butelclick

   } //button


    input(inpObj) {
        let inpEl = document.createElement('input');
        Object.assign(inpEl,inpObj);
        Object.assign(inpEl.style,inpObj.style);
//        inpEl.addEventListener('input',(event) => {inpFun(event)});
        inpEl.addEventListener('click',(event) => {inpClickFun(event)});
        inpEl.addEventListener('keydown',(event) => {keyDownFun(event)});
        inpEl.addEventListener('keyup',(event) => {keyUpFun(event)});
        inpObj.parent.append(inpEl);
        return inpEl;

        function inpClickFun(e) {
            e.preventDefault();
            console.log('input click: ' + e.target.value);
        }

        function keyUpFun(e) {
            e.preventDefault();
            console.log('key up: '+ e.key);
            if (e.key == 'Enter') {
                console.log('key enter: ' + e.target.value);
            }
        }

        function keyDownFun(e) {
            let key = e.key;
            let el = e.target;
            let ctrlkey = e.ctrlKey;
      console.log('key down1: ' + key + ' control: ' + ctrlkey );

            switch (key) {
            case "ArrowLeft":
                if (ctrlkey) {
                }
                break;
            case "ArrowRight":
        // Right pressed
                if (ctrlkey) {
                }
                break;
            case "ArrowUp":
        // Up pressed
                if (ctrlkey) {
                    console.log('cntl key up');
                }
                console.log('key up');
                break;
            case "ArrowDown":
        // Down pressed
                if (ctrlkey) {
                }
                break;
            default:
                return;
            }

        } // keyfun
    } // input

} //html widget


class svgIcon {
  constructor(size) {
    this.svgNS = "http://www.w3.org/2000/svg";
    this.size = size;
  }

  creIcon(iconObj) {
    let svgEl = document.createElementNS(this.svgNS, 'svg');
    if (iconObj['size'] === undefined) {
        svgEl.setAttribute('width', this.size);
        svgEl.setAttribute('height', this.size);
    } else {
        svgEl.setAttribute('width', iconObj['size']);
        svgEl.setAttribute('height', iconObj['size']);
    }
    svgEl.setAttribute('viewBox', '0 0 100 100');
    svgEl.setAttribute('version', '1.1');
    Object.assign(svgEl.style,iconObj.svgStyle);

    let pathEl = document.createElementNS(this.svgNS,'path');
    Object.assign(pathEl.style,iconObj.style);
    switch (iconObj.iconType) {
        case 'login':
//          pathEl.setAttribute('d', 'M 50,40 A 15,15 0 0 1 50,10 A 15,15 0 0 1 50,40 M 21,98 A 28,49 0 0 1 50,50 28,49 0 0 1 78,98 Z');
            pathEl.setAttribute('d', 'M 50,40 A 15,15 0 0 1 50,10 A 15,15 0 0 1 50,40 M 22,90 A 28,49 0 0 1 50,50 28,49 0 0 1 78,90 60,60 90 0 1 22,90');
            break;
        case 'menu':
            pathEl.setAttribute('d', 'M 5,20 h 90 M 5,50 h 90 M 5,80 h 90');
            break;
        case 'home':
            pathEl.setAttribute('d', 'M 15,40 V 95 H 85 V 40 M 5,44 50,15 95,44');
            break;
        case 'exit':
            pathEl.setAttribute('d', 'm 5,5 90,90 m -90,0 90, -90');
            break;
        default:
          throw 'unknown icon: ' + iconObj.icon;
    }
    let hovKeys = Object.keys(iconObj.hovStyle);

    svgEl.addEventListener('mouseover',(event)=>{svgElHov(event);});
    svgEl.addEventListener('mouseleave',(event)=>{svgElHovLeave(event, svgEl);});
    svgEl.addEventListener('click',(event)=>{svgElClick(event);});
    svgEl.state = false;
    svgEl.append(pathEl);
    iconObj.parent.append(svgEl);

    function svgElHov(e) {
        if (e.target.state) { return}
        e.preventDefault();
        e.target.style.cursor = 'pointer';
        for (let i=0; i<hovKeys.length; i++) {
            let prop = hovKeys[i];
            pathEl.style[prop] = iconObj.hovStyle[prop];
        }
        e.target.state = true;
        console.log('hover');
    }

    function svgElHovLeave(e, el) {
        e.preventDefault();
        e.target.style.cursor = 'default';
        for (let i=0; i<hovKeys.length; i++) {
            let prop = hovKeys[i];
            pathEl.style[prop] = iconObj.style[prop];
        }
        el.state = false;
        console.log('leaving');
    }

    function svgElClick(e) {
        e.preventDefault();
        console.log('click');
    }

  }

} //svg Icons

class tableWidget {

    constructor() {
        this.focusCol = 0;
        this.focusRow = 0;
    }

    init(tblObj) {
      let tbl = document.createElement('table');
      Object.assign(tbl,tblObj);
      Object.assign(tbl.style,tblObj.style);
      Object.assign(tbl.hovCellStyle,tblObj.hovCellStyle);
	  this.tbl = tbl;
      tbl.hovKeys = Object.keys(tbl.hovCellStyle);

	  let head = tblObj.hasOwnProperty('head');
      if (head) {
        let theader = tbl.createTHead();
        let hrow = theader.insertRow();
        let hcell = hrow.insertCell();
      }

      let tbody = tbl.createTBody();
      for (let row=0; row < tbl.nrows; row++) {
        let trow = tbody.insertRow();
        trow.id = tbl.id + 'Row' + row;
        trow.classList.add((tbl.id + 'Row'), (tbl.id + 'Row' + row));
        for (let col=0; col < tbl.ncols; col++) {
            let newCell = trow.insertCell();
			Object.assign(newCell.style, tblObj.cellStyle);
            newCell.id = tbl.id + 'R' + row + 'C' + col;
            newCell.classList.add((tbl.id + 'Cell'), (tbl.id + 'CelCol' + col), (tbl.id + 'CelRow' + row));
            newCell.textContent = 'R' + row + 'C' + col;
            if (tbl.edit) {newCell.contentEditable = 'true'};
            newCell.addEventListener('input',(event) => {inpFun(event)});
            newCell.addEventListener('click',(event) => {clickFun(event)});
            newCell.addEventListener('keydown',(event) => {keydFun(event)});
            newCell.addEventListener('mouseenter',(event) => {cellHover(event)});
            newCell.addEventListener('mouseleave',(event) => {cellLeave(event)});
        }
      }

      tbl.addEventListener('blur',(event) => {this.focoutFun(event)});

	  function keydFun(e) {
        let key = e.key;
        let cel = e.target;
        let ctrlkey = e.ctrlKey;
        let icol = cel.cellIndex;
        let irow = cel.parentNode.rowIndex;
//      console.log('key down1: ' + key + ' control: ' + ctrlkey + ' row: ' + irow + ' col: ' + icol);
        let tbl = this.el;

        switch (key) {
        case "ArrowLeft":
            if (ctrlkey) {
                if (icol>0) tbl.rows[irow].cells[icol-1].focus();
            }
        break;
        case "ArrowRight":
        // Right pressed
            if (ctrlkey) {
                if (icol < this.cols) tbl.rows[irow].cells[icol+1].focus();
            }
            break;
        case "ArrowUp":
        // Up pressed
            if (ctrlkey) {
                if (irow > 0) tbl.rows[irow-1].cells[icol].focus();
            }
            break;
        case "ArrowDown":
        // Down pressed
            if (ctrlkey) {
                if (irow < this.rows) tbl.rows[irow+1].cells[icol].focus();
            }
            break;
        default:
            return;
        }

//      console.log('key down2: ' + key + ' control: ' + ctrlkey );
    }

    function inpFun(e) {

    }

    function clickFun(e) {
        let cel = e.target;
        let icol = cel.cellIndex;
        let irow = cel.parentNode.rowIndex;
        console.log('click' + cel + ' icol: ' + icol + ' irow: ' + irow );
        cel.focus();
    }

    function focoutFun(e) {
        let el = e.target;
//      console.log("table: ' + el)
//        let cel = e.target;
//        let icol = cel.cellIndex;
//        let irow = cel.parentNode.rowIndex;
//        tabobj.dtab[irow-1][icol-1].nval = cel.textContent;
//        console.log('blur: ' + cel.textContent + ' |icol: ' + icol + ' irow: ' + irow );
    }

	function cellHover(e) {
		let cel = e.target;
//		console.log('hovering ' + cel.id);
		cel.style.cursor = 'pointer';
		let hovKeys = tbl.hovKeys;
        for (let i=0; i<hovKeys.length; i++) {
                let prop = hovKeys[i];
//              console.log('keys: ' + prop + '\n');
                cel.style[prop] = tbl.hovCellStyle[prop];
        }
		tbl.cell = cel;
    }

	function cellLeave(e) {
		let cel = tbl.cell;
//		console.log('leaving cell ' + cel.id);
		if (cel==null) {return};
		let hovKeys = tbl.hovKeys;
        for (let i=0; i<hovKeys.length; i++) {
                let prop = hovKeys[i];
//              console.log('keys: ' + prop + '\n');
                cel.style[prop] = tbl.cellStyle[prop];
        }
		tbl.cell = null;
		cel.style.cursor = 'pointer';
	}

	function load(datObj) {

    }
    return tbl;
  } //init

} //tablewidget
