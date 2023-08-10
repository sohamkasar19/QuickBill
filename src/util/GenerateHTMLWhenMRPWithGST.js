export const generateHTMLWhenMRPWithGST = (orderId, order) => {
  let dealerDetails = order.dealer;
  let productList = order.productList;

  const today = new Date();
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

  let html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <style type="text/css">
        * {
          margin: 0;
          padding: 0;
          text-indent: 0;
        }
        .s1 {
          color: black;
          font-family: Arial, sans-serif;
          font-style: normal;
          font-weight: bold;
          text-decoration: none;
          font-size: 14.5pt;
        }
        .s2 {
          color: black;
          font-family: Arial, sans-serif;
          font-style: normal;
          font-weight: bold;
          text-decoration: none;
          font-size: 11pt;
        }
        .s3 {
          color: black;
          font-family: Arial, sans-serif;
          font-style: normal;
          font-weight: normal;
          text-decoration: none;
          font-size: 9pt;
        }
        .s4 {
          color: black;
          font-family: Arial, sans-serif;
          font-style: normal;
          font-weight: bold;
          text-decoration: none;
          font-size: 9pt;
        }
        .s5 {
          color: black;
          font-family: Arial, sans-serif;
          font-style: normal;
          font-weight: normal;
          text-decoration: none;
          font-size: 9.5pt;
        }
        table,
        tbody {
          vertical-align: top;
          overflow: visible;
        }
      </style>
    </head>
    <body>
      <p style="text-indent: 0pt; text-align: left"><br /></p>
      <table
        style="border-collapse: collapse; margin-left: 5.91pt"
        cellspacing="0"
      >
        <tr style="height: 17pt">
          <td
            style="
              width: 511pt;
              border-top-style: solid;
              border-top-width: 1pt;
              border-left-style: solid;
              border-left-width: 1pt;
              border-bottom-style: solid;
              border-bottom-width: 1pt;
              border-right-style: solid;
              border-right-width: 1pt;
            "
            colspan="10"
          >
            <p
              class="s1"
              style="
                padding-left: 209pt;
                padding-right: 208pt;
                text-indent: 0pt;
                line-height: 16pt;
                text-align: center;
              "
            >
              SALES ORDER
            </p>
          </td>
        </tr>
        <tr style="height: 65pt">
          <td
            style="
              width: 511pt;
              border-top-style: solid;
              border-top-width: 1pt;
              border-left-style: solid;
              border-left-width: 1pt;
              border-bottom-style: solid;
              border-bottom-width: 1pt;
              border-right-style: solid;
              border-right-width: 1pt;
            "
            colspan="10"
          >
            <p
              class="s2"
              style="
                padding-top: 4pt;
                padding-left: 1pt;
                text-indent: 0pt;
                text-align: left;
              "
            >
              SANZYME BIOLOGICS PRIVATE LIMITED
            </p>
            <p
              class="s3"
              style="
                padding-top: 2pt;
                padding-left: 1pt;
                padding-right: 397pt;
                text-indent: 0pt;
                line-height: 112%;
                text-align: left;
              "
            >
              Plot No. 13, Sagar Society, Road No. 2, Banjara Hills, Hyderabad -
              500 034
            </p>
          </td>
        </tr>
        <tr style="height: 33pt">
          <td
            style="
              width: 137pt;
              border-top-style: solid;
              border-top-width: 1pt;
              border-left-style: solid;
              border-left-width: 1pt;
              border-bottom-style: solid;
              border-bottom-width: 1pt;
            "
          >
            <p
              class="s4"
              style="
                padding-left: 1pt;
                text-indent: 0pt;
                line-height: 10pt;
                text-align: left;
              "
            >
              Order No. : ${orderId}
            </p>
            <p style="text-indent: 0pt; text-align: left"><br /></p>
            <p
              class="s4"
              style="
                padding-left: 1pt;
                text-indent: 0pt;
                line-height: 10pt;
                text-align: left;
              "
            >
              Field Staff : ${dealerDetails.Employee}
            </p>
          </td>
          <td
            style="
              width: 30pt;
              border-top-style: solid;
              border-top-width: 1pt;
              border-bottom-style: solid;
              border-bottom-width: 1pt;
            "
          >
            <p style="text-indent: 0pt; text-align: left"><br /></p>
          </td>
          <td
            style="
              width: 24pt;
              border-top-style: solid;
              border-top-width: 1pt;
              border-bottom-style: solid;
              border-bottom-width: 1pt;
            "
          >
            <p style="text-indent: 0pt; text-align: left"><br /></p>
          </td>
          <td
            style="
              width: 30pt;
              border-top-style: solid;
              border-top-width: 1pt;
              border-bottom-style: solid;
              border-bottom-width: 1pt;
            "
          >
            <p style="text-indent: 0pt; text-align: left"><br /></p>
          </td>
          <td
            style="
              width: 38pt;
              border-top-style: solid;
              border-top-width: 1pt;
              border-bottom-style: solid;
              border-bottom-width: 1pt;
            "
          >
            <p style="text-indent: 0pt; text-align: left"><br /></p>
          </td>
          <td
            style="
              width: 47pt;
              border-top-style: solid;
              border-top-width: 1pt;
              border-bottom-style: solid;
              border-bottom-width: 1pt;
            "
          >
            <p style="text-indent: 0pt; text-align: left"><br /></p>
          </td>
          <td
            style="
              width: 46pt;
              border-top-style: solid;
              border-top-width: 1pt;
              border-bottom-style: solid;
              border-bottom-width: 1pt;
            "
          >
            <p style="text-indent: 0pt; text-align: left"><br /></p>
          </td>
          <td
            style="
              width: 48pt;
              border-top-style: solid;
              border-top-width: 1pt;
              border-bottom-style: solid;
              border-bottom-width: 1pt;
            "
          >
            <p
              class="s4"
              style="
                padding-left: 13pt;
                text-indent: 0pt;
                line-height: 10pt;
                text-align: left;
              "
            >
              Date :
            </p>
          </td>
          <td
            style="
              width: 111pt;
              border-top-style: solid;
              border-top-width: 1pt;
              border-bottom-style: solid;
              border-bottom-width: 1pt;
              border-right-style: solid;
              border-right-width: 1pt;
            "
            colspan="2"
          >
            <p
              class="s3"
              style="
                padding-left: 3pt;
                text-indent: 0pt;
                line-height: 10pt;
                text-align: left;
              "
            >
            ${formattedToday}
            </p>
          </td>
        </tr>
        <tr style="height: 11pt">
          <td
            style="
              width: 511pt;
              border-top-style: solid;
              border-top-width: 1pt;
              border-left-style: solid;
              border-left-width: 1pt;
              border-bottom-style: solid;
              border-bottom-width: 1pt;
              border-right-style: solid;
              border-right-width: 1pt;
            "
            colspan="10"
          >
            <p
              class="s4"
              style="
                padding-left: 1pt;
                text-indent: 0pt;
                line-height: 9pt;
                text-align: left;
              "
            >
              ORDER FROM :
            </p>
          </td>
        </tr>
        <tr style="height: 57pt">
          <td
            style="
              width: 511pt;
              border-top-style: solid;
              border-top-width: 1pt;
              border-left-style: solid;
              border-left-width: 1pt;
              border-bottom-style: solid;
              border-bottom-width: 1pt;
              border-right-style: solid;
              border-right-width: 1pt;
            "
            colspan="10"
          >
            <p
              class="s4"
              style="
                padding-left: 1pt;
                text-indent: 0pt;
                line-height: 10pt;
                text-align: left;
              "
            >
            ${dealerDetails.DealerName}
            </p>
            <p
              class="s5"
              style="
                padding-top: 1pt;
                padding-left: 1pt;
                text-indent: 0pt;
                text-align: left;
              "
            >
            ${dealerDetails.Address1 ? dealerDetails.Address1 : ''}
            </p>
            <p
              class="s3"
              style="
                padding-left: 1pt;
                padding-right: 338pt;
                text-indent: 0pt;
                line-height: 110%;
                text-align: left;
              "
            >
            ${dealerDetails.Address2 ? dealerDetails.Address2 : ''}
            </p>
            <p
              class="s3"
              style="
                padding-left: 1pt;
                padding-right: 338pt;
                text-indent: 0pt;
                line-height: 110%;
                text-align: left;
              "
            >
            ${dealerDetails.Address3 ? dealerDetails.Address3 : ''}
            </p>
          </td>
        </tr>
        <tr style="height: 22pt">
        <td
          style="
            width: 137pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-right-style: solid;
            border-right-width: 1pt;
          "
        >
          <p
            class="s3"
            style="
              padding-left: 1pt;
              text-indent: 0pt;
              line-height: 10pt;
              text-align: left;
            "
          >
            Particulat
          </p>
        </td>
        <td
          style="
            width: 30pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-right-style: solid;
            border-right-width: 1pt;
          "
        >
          <p
            class="s3"
            style="
              padding-left: 6pt;
              text-indent: 0pt;
              line-height: 10pt;
              text-align: left;
            "
          >
            Unit
          </p>
        </td>
        <td
          style="
            width: 24pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-right-style: solid;
            border-right-width: 1pt;
          "
        >
          <p
            class="s3"
            style="text-indent: 0pt; line-height: 10pt; text-align: center"
          >
            MRP
          </p>
        </td>
        <td
          style="
            width: 30pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-right-style: solid;
            border-right-width: 1pt;
          "
        >
          <p
            class="s3"
            style="
              padding-left: 4pt;
              text-indent: 0pt;
              line-height: 10pt;
              text-align: left;
            "
          >
            No.of
          </p>
          <p
            class="s3"
            style="
              padding-top: 1pt;
              padding-left: 5pt;
              text-indent: 0pt;
              line-height: 10pt;
              text-align: left;
            "
          >
            Units
          </p>
        </td>
        <td
          style="
            width: 38pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-right-style: solid;
            border-right-width: 1pt;
          "
        >
          <p
            class="s3"
            style="
              padding-left: 3pt;
              padding-right: 2pt;
              text-indent: 0pt;
              line-height: 10pt;
              text-align: center;
            "
          >
            Qty
          </p>
          <p
            class="s3"
            style="
              padding-top: 1pt;
              padding-left: 3pt;
              padding-right: 2pt;
              text-indent: 0pt;
              line-height: 10pt;
              text-align: center;
            "
          >
            Kgs/Lts
          </p>
        </td>
        <td
          style="
            width: 47pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-right-style: solid;
            border-right-width: 1pt;
          "
        >
          <p
            class="s3"
            style="
              padding-left: 13pt;
              text-indent: 0pt;
              line-height: 10pt;
              text-align: left;
            "
          >
            Gross
          </p>
          <p
            class="s3"
            style="
              padding-top: 1pt;
              padding-left: 8pt;
              text-indent: 0pt;
              line-height: 10pt;
              text-align: left;
            "
          >
            Amount
          </p>
        </td>
        <td
          style="
            width: 46pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-right-style: solid;
            border-right-width: 1pt;
          "
        >
          <p
            class="s3"
            style="
              padding-left: 12pt;
              padding-right: 12pt;
              text-indent: 0pt;
              line-height: 10pt;
              text-align: center;
            "
          >
            Net
          </p>
          <p
            class="s3"
            style="
              padding-top: 1pt;
              padding-left: 12pt;
              padding-right: 12pt;
              text-indent: 0pt;
              line-height: 10pt;
              text-align: center;
            "
          >
            Rate
          </p>
        </td>
        <td
          style="
            width: 48pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-right-style: solid;
            border-right-width: 1pt;
          "
        >
          <p
            class="s3"
            style="
              padding-left: 9pt;
              text-indent: 0pt;
              line-height: 10pt;
              text-align: left;
            "
          >
            Taxable
          </p>
          <p
            class="s3"
            style="
              padding-top: 1pt;
              padding-left: 13pt;
              text-indent: 0pt;
              line-height: 10pt;
              text-align: left;
            "
          >
            Value
          </p>
        </td>
        <td
          style="
            width: 52pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-right-style: solid;
            border-right-width: 1pt;
          "
        >
          <p
            class="s3"
            style="
              padding-left: 1pt;
              text-indent: 0pt;
              line-height: 10pt;
              text-align: center;
            "
          >
            GST
          </p>
          <p
            class="s3"
            style="
              padding-top: 1pt;
              text-indent: 0pt;
              line-height: 10pt;
              text-align: center;
            "
          >
            Amount
          </p>
        </td>
        <td
          style="
            width: 59pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-right-style: solid;
            border-right-width: 1pt;
          "
        >
          <p
            class="s3"
            style="
              padding-left: 13pt;
              text-indent: 0pt;
              line-height: 10pt;
              text-align: left;
            "
          >
            Amount
          </p>
          <p
            class="s3"
            style="
              padding-top: 1pt;
              padding-left: 18pt;
              text-indent: 0pt;
              line-height: 10pt;
              text-align: left;
            "
          >
            Value
          </p>
        </td>
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
      totalGrossAmount += Number(grossAmount);
      totalTaxableAmount += Number(taxableAmount);
      totalTotalAmount += Number(totalAmount);
      totalGSTAmount += Number(gstAmount);
    }

    html += `
    <tr style="height: 11pt">
        <td
          style="
            width: 137pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-right-style: solid;
            border-right-width: 1pt;
          "
        >
          <p
            class="s3"
            style="
              padding-left: 1pt;
              text-indent: 0pt;
              line-height: 9pt;
              text-align: left;
            "
          >
          ${currProduct.ItemName}
          </p>
        </td>
        <td
          style="
            width: 30pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-right-style: solid;
            border-right-width: 1pt;
          "
        >
          <p
            class="s3"
            style="
              padding-left: 1pt;
              text-indent: 0pt;
              line-height: 9pt;
              text-align: left;
            "
          >
          ${currProduct.Unit} ${currProduct.UOM}
          </p>
        </td>
        <td
          style="
            width: 24pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-right-style: solid;
            border-right-width: 1pt;
          "
        >
          <p
            class="s3"
            style="
              padding-left: 1pt;
              text-indent: 0pt;
              line-height: 9pt;
              text-align: center;
            "
          >
          ${currProduct.MRP}
          </p>
        </td>
        <td
          style="
            width: 30pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-right-style: solid;
            border-right-width: 1pt;
          "
        >
          <p
            class="s3"
            style="text-indent: 0pt; line-height: 9pt; text-align: center"
          >
          ${noOfUnits}
          </p>
        </td>
        <td
          style="
            width: 38pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-right-style: solid;
            border-right-width: 1pt;
          "
        >
          <p
            class="s3"
            style="
              padding-left: 16pt;
              text-indent: 0pt;
              line-height: 9pt;
              text-align: left;
            "
          >
          ${productData.quantity}
          </p>
        </td>
        `;
    if (productData.type === 'Regular') {
      html += `
      <td
          style="
            width: 47pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-right-style: solid;
            border-right-width: 1pt;
          "
        >
          <p
            class="s3"
            style="
              padding-right: 1pt;
              text-indent: 0pt;
              line-height: 9pt;
              text-align: right;
            "
          >
          ${grossAmount}
          </p>
        </td>
        <td
          style="
            width: 46pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-right-style: solid;
            border-right-width: 1pt;
          "
        >
          <p
            class="s3"
            style="
              padding-right: 1pt;
              text-indent: 0pt;
              line-height: 9pt;
              text-align: right;
            "
          >
            ${netRate}
          </p>
        </td>
        <td
          style="
            width: 48pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-right-style: solid;
            border-right-width: 1pt;
          "
        >
          <p
            class="s3"
            style="
              padding-right: 1pt;
              text-indent: 0pt;
              line-height: 9pt;
              text-align: right;
            "
          >
            ${taxableAmount}
          </p>
        </td>
        <td
          style="
            width: 52pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-right-style: solid;
            border-right-width: 1pt;
          "
        >
            <p
                class="s3"
                style="
                padding-right: 1pt;
                text-indent: 0pt;
                line-height: 9pt;
                text-align: right;
                "
            >
                ${gstAmount}
            </p>
        </td>
        <td
          style="
            width: 59pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-right-style: solid;
            border-right-width: 1pt;
          "
        >
          <p
            class="s3"
            style="
              padding-right: 1pt;
              text-indent: 0pt;
              line-height: 9pt;
              text-align: right;
            "
          >
            ${totalAmount}
          </p>
        </td>
      </tr>
      
    `;
    } else if (productData.type === 'Free Sample') {
      html += `
      <td
          style="
            width: 87pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-right-style: solid;
            border-right-width: 1pt;
          "
          colspan="4"
        >
          <p
            class="s4"
            style="
              padding-left: 1pt;
              text-indent: 0pt;
              line-height: 9pt;
              text-align: left;
            "
          >
            FREE SAMPLE NOT FOR SALE
          </p>
        </td>
        <td
          style="
            width: 59pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-right-style: solid;
            border-right-width: 1pt;
          "
        >
          <p
            class="s3"
            style="
              padding-right: 1pt;
              text-indent: 0pt;
              line-height: 9pt;
              text-align: right;
            "
          >
            0.00
          </p>
        </td>
      </tr>
    `;
    } else if (productData.type === 'Free Item') {
      html += `
      <td
      style="
        width: 146pt;
        border-top-style: solid;
        border-top-width: 1pt;
        border-left-style: solid;
        border-left-width: 1pt;
        border-bottom-style: solid;
        border-bottom-width: 1pt;
        border-right-style: solid;
        border-right-width: 1pt;
      "
      colspan="4"
    >
      <p
        class="s4"
        style="
          padding-left: 1pt;
          text-indent: 0pt;
          line-height: 9pt;
          text-align: left;
        "
      >
        FREE UNIT
      </p>
    </td>
    <td
      style="
        width: 59pt;
        border-top-style: solid;
        border-top-width: 1pt;
        border-left-style: solid;
        border-left-width: 1pt;
        border-bottom-style: solid;
        border-bottom-width: 1pt;
        border-right-style: solid;
        border-right-width: 1pt;
      "
    >
      <p
        class="s3"
        style="
          padding-right: 1pt;
          text-indent: 0pt;
          line-height: 9pt;
          text-align: right;
        "
      >
        0.00
      </p>
    </td>
  </tr>
      `;
    }
  });
  html += `
  <tr style="height: 11pt">
        <td
          style="
            width: 137pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-right-style: solid;
            border-right-width: 1pt;
          "
        >
        <p
            class="s3"
            style="
              padding-left: 1pt;
              text-indent: 0pt;
              line-height: 9pt;
              text-align: left;
            "
          >
            TOTAL
          </p>
        </td>
        <td
          style="
            width: 30pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-right-style: solid;
            border-right-width: 1pt;
          "
        >
        <p style="text-indent: 0pt; text-align: left"><br /></p>

        </td>
        <td
          style="
            width: 24pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-right-style: solid;
            border-right-width: 1pt;
          "
        >
          <p style="text-indent: 0pt; text-align: left"><br /></p>
        </td>
        <td
          style="
            width: 30pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-right-style: solid;
            border-right-width: 1pt;
          "
        >
          <p style="text-indent: 0pt; text-align: left"><br /></p>
        </td>
        <td
          style="
            width: 38pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-right-style: solid;
            border-right-width: 1pt;
          "
        >
          <p
            class="s3"
            style="
              padding-left: 13pt;
              text-indent: 0pt;
              line-height: 9pt;
              text-align: left;
            "
          >
            ${totalQty.toFixed(2)}
          </p>
        </td>
        <td
          style="
            width: 47pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-right-style: solid;
            border-right-width: 1pt;
          "
        >
          <p
            class="s3"
            style="
              padding-right: 1pt;
              text-indent: 0pt;
              line-height: 9pt;
              text-align: right;
            "
          >
            ${totalGrossAmount.toFixed(2)}
          </p>
        </td>
        <td
          style="
            width: 46pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-right-style: solid;
            border-right-width: 1pt;
          "
        >
          <p style="text-indent: 0pt; text-align: left"><br /></p>
        </td>
        <td
          style="
            width: 48pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-right-style: solid;
            border-right-width: 1pt;
          "
        >
          <p
            class="s3"
            style="
              padding-right: 1pt;
              text-indent: 0pt;
              line-height: 9pt;
              text-align: right;
            "
          >
            ${totalTaxableAmount.toFixed(2)}
          </p>
        </td>
        <td
          style="
            width: 52pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-right-style: solid;
            border-right-width: 1pt;
          "
        >
            <p
                class="s3"
                style="
                padding-right: 1pt;
                text-indent: 0pt;
                line-height: 9pt;
                text-align: right;
                "
            >
                ${totalGSTAmount.toFixed(2)}
            </p>
        </td>
        <td
          style="
            width: 59pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-right-style: solid;
            border-right-width: 1pt;
          "
        >
          <p
            class="s3"
            style="
              padding-right: 1pt;
              text-indent: 0pt;
              line-height: 9pt;
              text-align: right;
            "
          >
            ${totalTotalAmount.toFixed(2)}
          </p>
        </td>
      </tr>
      <tr style="height: 11pt">
        <td
          style="
            width: 400pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-right-style: solid;
            border-right-width: 1pt;
          "
          colspan="8"
        >
          <p style="text-indent: 0pt; text-align: left"><br /></p>
        </td>
        <td
          style="
            width: 52pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-right-style: solid;
            border-right-width: 1pt;
          "
        >
          <p
            class="s3"
            style="text-indent: 0pt; line-height: 9pt; text-align: center"
          >
            TOTAL R/O
          </p>
        </td>
        <td
          style="
            width: 59pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-right-style: solid;
            border-right-width: 1pt;
          "
        >
          <p
            class="s3"
            style="
              padding-right: 1pt;
              text-indent: 0pt;
              line-height: 9pt;
              text-align: right;
            "
          >
            ${Math.round(totalTotalAmount).toFixed(2)}
          </p>
        </td>
      </tr>
      <tr style="height: 69pt">
        <td
          style="
            width: 511pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-right-style: solid;
            border-right-width: 1pt;
          "
          colspan="10"
        >
          <p style="text-indent: 0pt; text-align: left"><br /></p>
          <p
            class="s4"
            style="padding-right: 13pt; text-indent: 0pt; text-align: right"
          >
            For Sanzyme Biologics Private Limited
          </p>
          <p style="text-indent: 0pt; text-align: left"><br /></p>
          <p
            class="s3"
            style="padding-right: 30pt; text-indent: 0pt; text-align: right"
          >
            Authorized Representative
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>

  `;
  return html;
};
