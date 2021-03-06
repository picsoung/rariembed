/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

 import {LitElement, svg} from 'lit';
 import {customElement} from 'lit/decorators.js';
 
 /**
  * An example element.
  *
  * @slot - This element has a slot
  * @csspart button - The button
  */
 @customElement('svg-dollar-icon')
 export class SVGDollarIcon extends LitElement {
    render(){
        return svg`
        <?xml version="1.0" encoding="UTF-8"?>
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30pt" height="30pt" viewBox="0 0 30 30" version="1.1">
        <g id="surface1">
        <path style="fill:none;stroke-width:40;stroke-linecap:butt;stroke-linejoin:miter;stroke:rgb(0%,0%,0%);stroke-opacity:1;stroke-miterlimit:4;" d="M 144.986979 311.979167 C 142.96875 380.989583 175.976562 411.979167 249.023438 413.997396 C 327.018229 414.973958 361.979167 380.013021 358.007812 313.020833 C 352.018229 255.013021 296.028646 239.973958 252.018229 233.984375 C 203.971354 216.992188 152.994792 208.984375 152.994792 138.997396 C 152.994792 91.015625 185.026042 60.026042 252.018229 61.002604 C 311.979167 61.002604 349.023438 86.002604 347.981771 144.986979 " transform="matrix(0.06,0,0,0.06,0,0)"/>
        <path style="fill:none;stroke-width:30;stroke-linecap:butt;stroke-linejoin:miter;stroke:rgb(0%,0%,0%);stroke-opacity:1;stroke-miterlimit:4;" d="M 250 14.973958 L 250 485.026042 " transform="matrix(0.06,0,0,0.06,0,0)"/>
        </g>
        </svg>        
        `
    }
 }

//  declare global {
//     interface HTMLElementTagNameMap {
//       'svg-dollar-icon': SVGDollarIcon;
//     }
//   }