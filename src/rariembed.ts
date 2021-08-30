/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';

// import './svgIconElement'
// import './svgDollarElement'
// import './loaderElement'
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
*/

const CARD_HEIGHT = '210px'
const CARD_WIDTH = '80vw'

@customElement('rari-embed')
export class RariEmbed extends LitElement {
  
  @property({type: String})
  tokenAddress = ''

  @property({type: String})
  tokenId = "";

  @property({type: String})
  width = "700px"

  @property({type: String})
  height = "250px"

  @property({type: String})
  name = ''

  @property({type: String})
  imageUrl = ''

  @property({type: Array})  
  objAttributes = []
  
  @property({type: String})
  collectionName = ''

  @property({type: String})
  collectionAvatar = ''

  @property({type: String})
  ownerId = ''

  @property({type: String})
  ownerName = ''
  @property({type: String})
  ownerAvatar = ''
  @property({type: Number})
  ethPrice = 0

  @property({type: Number})
  usdPrice = 0

  @property({type: Boolean})
  forSale = false

  @property({type: Boolean})
  loading = true

  @property({type: Boolean})
  darkMode = false
  
  static styles = css`
    .dark {
      background-color: rgb(18, 18, 18);
      color: rgb(255, 255, 255)
    }

    .white{
      background-color: rgb(255, 255, 255)
    }
    .card {
      border-radius: 16px;
      max-width: 800px;
      max-height: 250px;
      display: flex;
      flex-direction: row;
      align-items: center;
      font-family:"Circular Std", Helvetica, Arial, sans-serif;
      box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.25);
    }

    .asset-container {
      border-right: 1px solid rgba(4, 4, 5, 0.1);
      max-height: 250px;
    }

    .asset-image {
      background-size: contain;
      background-position: 50%;
      background-repeat: no-repeat;
      height: 100%;
      box-sizing: border-box;
    }

    .asset-container img {
      border-top-left-radius: 16px;
      border-bottom-left-radius: 16px;
      height:100%;
    }

    .details {
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 1em;
    }
    .collection {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .avatar{
      width: 40px;
      height: 40px;
      object-fit: cover;
      border-radius: 40px;
    }

    .desc-container {
      margin-left: 10px;
    }

    .desc-container span{
      font-weight: 900;
      font-size: 15px;
    }

    .sectionHeader{
      font-weight: 400;
      font-size: 13px;
    }

    .flex {
      display:flex;
    }

    .ownershipAndCollection{
      display: inline-flex;
      flex-wrap: wrap;
      gap: 15px;
      // justify-content: space-around;
    }

    a {
      text-decoration:none;
      color:inherit;
    }

    .button{
      border: none;
      width: 100%;
      background-color: #fdd902;
      border-radius:6px;
      color: black ;
      margin-right:10px;
      padding:10px 10px 10px 10px;
      text-transform: uppercase;
    }

    .button:hover{
      color: #fdd902;
      background-color: black;
    }
  `;


  public async connectedCallback() {
    super.connectedCallback()
    
    this.width = this.width ? this.width : CARD_WIDTH
    this.height = this.height ? this.height : CARD_HEIGHT
    //   ? this.height
    //   : this.horizontal
    //   ? HORIZONTAL_CARD_HEIGHT
    //   : VERT_CARD_HEIGHT
    // this.minHeight = this.horizontal
    //   ? HORIZONTAL_MIN_CARD_HEIGHT
    //   : VERT_MIN_CARD_HEIGHT
    // this.maxWidth = this.horizontal ? HORIZONTAL_CARD_MAX_WIDTH : ''


    //call Rarible API to get details

    // get item detail
      // await fetch(`https://hyd07vaa2c.execute-api.us-east-1.amazonaws.com/protocol/v0.1/ethereum/nft/items/${this.tokenAddress}:${this.tokenId}/meta`,{
    console.log([`${this.tokenAddress}:${this.tokenId}`])
      await fetch(`https://hyd07vaa2c.execute-api.us-east-1.amazonaws.com//mainnet/marketplace/api/v4/items/map`,{
        method:"POST",
        body: JSON.stringify([`${this.tokenAddress}:${this.tokenId}`]),
        headers: {
           "Content-type":"application/json; charset=UTF-8"
        }
      })
      .then((response) => response.json())
      .then((response) => {
        console.log('itemsmap', response)
        if (response.status >= 400 && response.status < 600) {
          throw new Error(`RARIBLE API ERROR: ${response.error}`);
        }
        return response;
      })
      .then((res)=>{
        console.log('ote, detail',res)
        this.imageUrl = res[0].properties.imagePreview
        this.name = res[0].properties.name
        this.objAttributes = res[0].properties.attributes
        console.log('owner', res[0].item.owners[0])
        this.ownerId = res[0].item.owners[0]
        this.ethPrice = res[0].item.offerV2?.buyPriceEth || res[0].item.ownership?.priceEth || 0;
        this.usdPrice = res[0].item.offerV2?.takePriceUsd || 0;
        this.forSale = typeof res[0].item.ownership === "undefined" ? false : true
      })
      .catch((error) => {
        // Your error is here!
        console.log('error',error)
      });
      
   // get collection detail
   console.log(`https://hyd07vaa2c.execute-api.us-east-1.amazonaws.com/mainnet/marketplace/api/v4/collections/${this.tokenAddress}`)
   await fetch(`https://hyd07vaa2c.execute-api.us-east-1.amazonaws.com/mainnet/marketplace/api/v4/collections/${this.tokenAddress}`)
   .then((response) => response.json())
   .then((response) => {
     if (response.status >= 400 && response.status < 600) {
       throw new Error(`RARIBLE API ERROR: ${response.error}`);
     }
     return response;
   })
   .then((res)=>{
     console.log('res',res)
     this.collectionName = res.name
     this.collectionAvatar = res.pic ? `https://img.rarible.com/prod/image/upload/t_avatar_big/prod-collections/${this.tokenAddress}/avatar/${res.pic.replaceAll('ipfs://ipfs/','')}` : 'https://theme.zdassets.com/theme_assets/10342982/bb8d2a7ec0e54ad27a114410b18e9716a3bf9883.png'
    })
   .catch((error) => {
     // Your error is here!
     console.log('error',error)
   });

   console.log('owner', this.ownerId)
   //get user detail
   await fetch(`https://hyd07vaa2c.execute-api.us-east-1.amazonaws.com/mainnet/marketplace/api/v4/users/${this.ownerId}`)
   .then((response) => response.json())
   .then((response) => {
     if (response.status >= 400 && response.status < 600) {
       throw new Error(`RARIBLE API ERROR: ${response.error}`);
     }
     return response;
   })
   .then((res)=>{
     console.log('res',res)
     this.ownerName = res.username || this.ownerId.slice(0,5)+'...'
     this.ownerAvatar = res.pic ? `https://img.rarible.com/prod/image/upload/t_avatar_big/prod-users/${this.ownerId}/avatar/${res.pic.replaceAll('ipfs://ipfs/','')}` : 'https://theme.zdassets.com/theme_assets/10342982/bb8d2a7ec0e54ad27a114410b18e9716a3bf9883.png'
   })
   .catch((error) => {
     // Your error is here!
     console.log('error',error)
   });

   this.loading = false
  }

  public renderLoader(){
    console.log('loader')
    return html`
    <loader-element></loader-element>
    `
  }
  public renderPrice(forSale: boolean){
    if(forSale){
    return html`
      <div class="flex" style="align-items: center; gap: 2em;">
        <span style="font-size:25px;">Ξ ${this.ethPrice.toFixed(2)} ETH</span>
        <span style="color:grey;">$${this.usdPrice.toFixed(2)} USD</span>
      </div>
    `
  }else{
    return html`<div class="flex"><p>Not for sale</p></div>`
  }
  }
  public renderCard(){
    return html`
    <div class="asset-container">
        <a href="https://rarible.com/token/${this.tokenAddress}:${this.tokenId}">
           <img src="${this.imageUrl}" alt="${this.name}" title="${this.name}" />
        </a>
    </div>
    <div class="details">
      <div class="ownershipAndCollection">
        <div>
          <span class="sectionHeader">Collection</span>
          <div class="collection">
            <div class="flex avatar-container">
              <img class="avatar" src="${this.collectionAvatar}" alt="${this.collectionName}" title="${this.collectionName}"/>
            </div>
            <div class="desc-container">

            <a href="https://rarible.com/collection/${this.tokenAddress}" target="_blank">
              <span>${this.collectionName}</span>
            </a>
            </div>
          </div>
        </div>
        <div>
          <span class="sectionHeader">Owner</span>
          <div class="collection">
            <div class="flex avatar-container">
              <img class="avatar" src="${this.ownerAvatar}" alt="${this.ownerName}" title="${this.ownerName}"/>
            </div>
            <div class="desc-container">
              <a href="https://rarible.com/users/${this.ownerId}" target="_blank">
                <span>${this.ownerName}</span>
              </a>
            </div>
          </div>
        </div>
      </div> <!-- end ownershipandcollection -->
      <div class="flex">
        <p>${this.name}</p>
      </div>
      ${this.renderPrice(this.forSale)}
      <div style="margin-top: 2em;">
      <button class="button"><a target="_blank" href="https://rarible.com/token/${this.tokenAddress}:${this.tokenId}">See on Rarible ❯</a></button>
      </div>
    </div>`
  }

  render() {
    return html`
    <style>@font-face {
      font-weight: 100;
      font-family:"Circular Std";
      src: 
        local('Circular Std Medium'), 
        url(https://rarible.com/fb3a34fc1c30b5120300.woff) format("woff"), 
        url(https://rarible.com/9eac4707a63fe42da7d6.woff2) format("woff2");
    }
    
    @font-face {
      font-weight: 700;
      font-family:"Circular Std";
      src: 
        local('Circular Std Black'), 
        url(https://rarible.com/4af43345ede3fd952823.woff) format("woff"), 
        url(https://rarible.com/0dd92fa15d777f537028.woff2) format("woff2");
    }
    </style>
    <div class="card ${this.darkMode? 'dark': 'white'}" style="width: ${this.width}; height: ${this.height}">
      ${this.loading
        ? this.renderLoader()
        : this.renderCard() }
    </div>
    `;
  }

  // private _onClick() {
  //   // this.count++;
  // }
}

declare global {
  interface HTMLElementTagNameMap {
    'rari-embed': RariEmbed;
  }
}
