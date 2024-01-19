import {imageBase64} from './company_logo.js';

export const generateHTMLWhenMRPWithGST = (orderId, order) => {
  let dealerDetails = order.dealer;
  let productList = order.productList;

  const now = new Date();
  const today = new Date(now.getTime() + 330 * 60 * 1000);
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }

  const formattedToday = dd + '/' + mm + '/' + yyyy;

  let html = `<!DOCTYPE html>
  <html>
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        text-align: center;
      }
      
      .table {
        width: 511pt;
        border-collapse: collapse;
        margin-left: 5.775pt;
        margin-left: auto;
        margin-right: auto;
        margin-top: 25pt; 
      }
      
      .s1 {
        color: black;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: bold;
        text-decoration: none;
        font-size: 8pt;
        margin: 0.3em;
      }
      
      .s2 {
        color: black;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 8pt;
        margin: 0.3em;
      }
      
      th,
      td {
        border: 1pt solid black;
        padding: 4px;
        text-align: left;
      }
      
      .header {
        /* padding-left: 30pt;
        padding-right: 30pt; */
        /* text-indent: 0pt; */
        /* line-height: 9pt; */
        text-align: center;
      }
      
      .sub-header {
        padding-left: 1pt;
        /* padding-right: 384pt; */
        text-indent: 0pt;
        /* line-height: 11pt; */
        text-align: center;
      }
      
      .header-row {
        text-align: center;
      }
      
      .logo-container {
        float: left;
        width: 110pt;
      }
      
      .logo {
        width: 100%;
        height: auto;
      }
      
      .company-info {
        display: inline-block;
        vertical-align: middle;
      
        margin-right: 110pt;
      }
      
      /* Clear the float */
      /* .header-row::after {
        content: '';
        display: table;
        clear: both;
      } */
      
      .info-container {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding: 1px;
      }
      
      /* .left-info,
      .right-info {
        flex-basis: 70;
      } */
      
      .right-info {
        text-align: right;
      }
      
      .text-left {
        text-align: left;
      }
      
      .text-right {
        text-align: right;
      }
      
      .text-center {
        text-align: center;
      }
      
      .bold {
        font-weight: bold;
      }
      
      .small-text {
        font-size: 8pt;
        /* margin: 0; */
      }
      .no-margin {
        margin: 0;
      }
      .no-bottom-top-margin {
        margin-top: 0;
        margin-bottom: 0;
      }
      
      .no-padding {
        padding: 1px;
      }
      
      .col-particular {
        width: 137pt;
      }
      
      .col-unit {
        width: 30pt;
      }
      
      .col-mrp {
        width: 24pt;
      }
      
      .col-qty {
        width: 38pt;
      }
      
      .col-units {
        width: 25pt;
      }
      
      .col-gross {
        width: 47pt;
      }
      
      .col-net-rate {
        width: 46pt;
      }
      
      .col-disc-amt {
        width: 42pt;
      }
      
      .col-taxable {
        width: 48pt;
      }
      
      .col-gst {
        width: 34pt;
      }
      
      .col-total-amount {
        width: 59pt;
      }
      
      .signature {
        padding-left: 300pt;
        padding-right: 10pt;
        text-indent: 0pt;
        line-height: 9pt;
        text-align: center;
      }
      
      .no-bottom-border {
        border-bottom: none;
      }
      .no-border {
        border: none;
      }
      
      .no-top-border {
        border-top: none;
      }
      
      .no-left-border {
        border-left: none;
      }
      .no-right-border {
        border-right: none;
      }
      </style>
    </head>
    <body>
    <table class="table">
      <tr>
        <td colspan="10" class="s1 header">SALES ORDER</td>
      </tr>
      <tr>
        <td colspan="10" class="header-row">
          <div class="logo-container">
            <img src="${imageBase64}" alt="Company Logo" class="logo" />
          </div>
          <div class="company-info">
            <p class="s1 sub-header">SANZYME BIOLOGICS PRIVATE LIMITED</p>
            <p class="s2 sub-header">Plot No. 13, Sagar Society,</p>
            <p class="s2 sub-header">Road No. 2, Banjara Hills,</p>
            <p class="s2 sub-header">Hyderabad - 500 034</p>
          </div>
        </td>
      </tr>
      <tr>
        <td colspan="10">
          <div class="info-container">
            <div class="left-info">
              <p class="s1 small-text">Order No. : ${orderId}</p>

              <p class="s1 small-text">
                Field Staff : ${dealerDetails.Employee}
              </p>
            </div>
            <div class="right-info">
              <p class="s2 small-text">Date: ${formattedToday}</p>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <td colspan="10" class="text-left">
          <p class="s1 small-text ">ORDER FROM :</p>
          <p class="s1 small-text no-bottom-top-margin">${
            dealerDetails.DealerName
          }</p>
          <p class="s2 small-text no-bottom-top-margin">
            ${dealerDetails.Address1 ? dealerDetails.Address1 : ''}
          </p>
          <p class="s2 small-text no-bottom-top-margin">
            ${dealerDetails.Address2 ? dealerDetails.Address2 : ''}
          </p>
          <p class="s2 small-text no-bottom-top-margin">
            ${dealerDetails.Address3 ? dealerDetails.Address3 : ''}
          </p>
        </td>
      </tr>
      <tr>
        <td class="text-left small-text col-particular bold">Particulat</td>
        <td class="text-left small-text col-unit bold">Unit</td> 
        <td class="text-left small-text col-mrp bold">MRP</td>
        <td class="text-left small-text col-units bold">No. of Units</td> 
        <td class="text-left small-text col-qty bold">Qty Kg/Ltr</td> 
        <td class="text-left small-text col-gross bold">Gross Amount</td>
        <td class="text-left small-text col-net-rate bold">Net Rate</td> 
        <td class="text-left small-text col-taxable bold">Taxable Value</td> 
        <td class="text-left small-text col-gst bold">GST Amount</td>
        <td class="text-left small-text col-total-amount bold">Total Amount</td>
      </tr>
      
     `;
  let totalQty = 0;
  let totalGrossAmount = 0;
  let totalTaxableAmount = 0;
  let totalGSTAmount = 0;
  let totalTotalAmount = 0;
  productList.forEach(productData => {
    const currProduct = productData.product;
    const noOfUnits = productData.quantity / currProduct.Unit;
    productData.quantity = parseFloat(productData.quantity, 10).toFixed(2);
    const netRate = parseFloat(
      currProduct.MRP *
        (100 / (100 + currProduct.GST)) *
        (1 - (dealerDetails.Discount ? dealerDetails.Discount / 100 : 0)) *
        (1 -
          (dealerDetails.CashDiscount ? dealerDetails.CashDiscount / 100 : 0)),
    ).toFixed(2);
    const grossAmount = (currProduct.MRP * noOfUnits).toFixed(2);
    const taxableAmount = parseFloat(netRate * noOfUnits).toFixed(2);
    const gstAmount = parseFloat(
      taxableAmount * ((currProduct.GST ? currProduct.GST : 0) / 100),
      10,
    ).toFixed(2);
    const totalAmount = parseFloat(
      parseFloat(taxableAmount) + parseFloat(gstAmount),
      10,
    ).toFixed(2);
    totalQty += Number(productData.quantity);

    totalGrossAmount += Number(grossAmount);
    if (productData.type === 'Regular') {
      totalTaxableAmount += Number(taxableAmount);
      totalTotalAmount += Number(totalAmount);
      totalGSTAmount += Number(gstAmount);
    }

    html += `

    <tr>
      <td class="text-left small-text col-particular no-padding">
        ${currProduct.ItemName}
      </td>
      <td class="text-left small-text col-unit no-padding">
        ${currProduct.Unit} ${currProduct.UOM}
      </td>
      <td class="text-center small-text col-mrp no-padding">
        ${currProduct.MRP}
      </td>
      <td class="text-center small-text col-units no-padding">
        ${noOfUnits}
      </td>
      <td class="text-right small-text col-qty no-padding">
        ${productData.quantity}
      </td>
      
      <td class="text-right small-text col-gross no-padding">
        ${grossAmount}
      </td>
    
        
        `;
    if (productData.type === 'Regular') {
      html += `
      <td class="text-right small-text col-net-rate  no-padding">${netRate}</td> 
      <td class="text-right small-text col-taxable  no-padding"> ${taxableAmount}</td> 
      <td class="text-right small-text col-gst  no-padding">${gstAmount}</td>
      <td class="text-right small-text col-total-amount  no-padding">${totalAmount}</td>
    </tr>
      
    `;
    } else if (productData.type === 'Free Sample') {
      html += `
      <td colspan="3" class="text-left small-text no-padding">
        Free Sample Not For Sale
      </td>
      <td class="text-right small-text col-total-amount no-padding">0.00</td>
      </tr>
    `;
    } else if (productData.type === 'Free Item') {
      html += `
      <td colspan="3" class="text-left small-text no-padding">Free Unit</td>
      <td class="text-right small-text col-total-amount no-padding">0.00</td>
    </tr>
  
      `;
    }
  });
  html += `
  <tr>
        <td class="text-right small-text col-particular  no-padding">TOTAL</td>
        <td class="text-left small-text col-unit  no-padding"></td> 
        <td class="text-left small-text col-mrp  no-padding"></td>
        <td class="text-left small-text col-units  no-padding"></td> 
        <td class="text-right small-text col-qty  no-padding">${totalQty.toFixed(
          2,
        )}</td> 
        <td class="text-right small-text col-gross  no-padding">${totalGrossAmount.toFixed(
          2,
        )}</td>
        <td class="text-left small-text col-net-rate  no-padding"></td> 
        <td class="text-right small-text col-taxable  no-padding">${totalTaxableAmount.toFixed(
          2,
        )}</td> 
        <td class="text-right small-text col-gst  no-padding">${totalGSTAmount.toFixed(
          2,
        )}</td>
        <td class="text-right small-text col-total-amount  no-padding">${totalTotalAmount.toFixed(
          2,
        )}</td>
      </tr>
      <tr>
        <td colspan="7" class="no-bottom-border"></td>
        <td colspan="2" class="s2 no-padding">TOTAL R/O </td>
        <td class="s2 no-padding text-right">${Math.round(
          totalTotalAmount,
        ).toFixed(2)}
        </td>
      </tr>
      <tr>
        <td colspan="10" class="no-top-border">
          <p class="s2 signature bold">For Sanzyme Biologics Private Limited</p>
          <br />
          <p class="s2 signature">Authorized Representative</p>
        </td>
      </tr>
      
    </table>
  </body>
</html>

  `;
  return html;
};
