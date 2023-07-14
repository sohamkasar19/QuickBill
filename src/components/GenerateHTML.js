export const generateHTML = (orderId, order) => {
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
  let html = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>SALES ORDER - DATAIL - 1</title>
        <meta name="author" content="Soham Kasar" />
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
            font-size: 8pt;
          }
          .s2 {
            color: black;
            font-family: Arial, sans-serif;
            font-style: normal;
            font-weight: normal;
            text-decoration: none;
            font-size: 8pt;
          }
          table,
          tbody {
            vertical-align: top;
            overflow: visible;
          }
        </style>
      </head>
      <body>
        <table
          style="border-collapse: collapse; margin-left: 5.775pt"
          cellspacing="0"
        >
          <tr style="height: 10pt">
            <td
              style="
                width: 507pt;
                border-top-style: solid;
                border-top-width: 1pt;
                border-left-style: solid;
                border-left-width: 1pt;
                border-bottom-style: solid;
                border-bottom-width: 1pt;
                border-right-style: solid;
                border-right-width: 1pt;
              "
              colspan="11"
            >
              <p
                class="s1"
                style="
                  padding-left: 43pt;
                  padding-right: 43pt;
                  text-indent: 0pt;
                  line-height: 9pt;
                  text-align: center;
                "
              >
                SALES ORDER
              </p>
            </td>
          </tr>
          <tr style="height: 53pt">
            <td
              style="
                width: 507pt;
                border-top-style: solid;
                border-top-width: 1pt;
                border-left-style: solid;
                border-left-width: 1pt;
                border-bottom-style: solid;
                border-bottom-width: 1pt;
                border-right-style: solid;
                border-right-width: 1pt;
              "
              colspan="11"
            >
              <p style="text-indent: 0pt; text-align: left"><br /></p>
              <p
                class="s1"
                style="padding-left: 1pt; text-indent: 0pt; text-align: left"
              >
                SANZYME BIOLOGICS PRIVATE LIMITED
              </p>
              <p
                class="s2"
                style="
                  padding-left: 1pt;
                  padding-right: 399pt;
                  text-indent: 0pt;
                  line-height: 11pt;
                  text-align: left;
                "
              >
                Plot No. 13, Sagar Society, Road No. 2, Banjara Hills, Hyderabad -
                500 034
              </p>
            </td>
          </tr>
          <tr style="height: 32pt">
        <td
          style="
            width: 131pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
          "
        >
          <p
            class="s1"
            style="padding-left: 1pt; text-indent: 0pt; text-align: left"
          >
            Order No. : ${orderId}
          </p>
          <p style="text-indent: 0pt; text-align: left"><br /></p>
          <p
            class="s1"
            style="
              padding-left: 1pt;
              text-indent: 0pt;
              line-height: 9pt;
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
            width: 28pt;
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
            width: 40pt;
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
            width: 25pt;
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
            width: 42pt;
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
            class="s2"
            style="padding-left: 16pt; text-indent: 0pt; text-align: left"
          >
            Date:
          </p>
        </td>
        <td
          style="
            width: 91pt;
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
            class="s2"
            style="padding-left: 2pt; text-indent: 0pt; text-align: left"
          >
            ${formattedToday}
          </p>
        </td>
      </tr>
      <tr style="height: 10pt">
        <td
          style="
            width: 507pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-right-style: solid;
            border-right-width: 1pt;
          "
          colspan="11"
        >
          <p
            class="s1"
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
      <tr style="height: 42pt">
        <td
          style="
            width: 507pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-right-style: solid;
            border-right-width: 1pt;
          "
          colspan="11"
        >
          <p
            class="s1"
            style="padding-left: 1pt; text-indent: 0pt; text-align: left"
          >
            ${dealerDetails.DealerName}
          </p>
          <p
            class="s1"
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
            class="s1"
            style="
              padding-top: 1pt;
              padding-left: 1pt;
              text-indent: 0pt;
              text-align: left;
            "
          >
          ${dealerDetails.Address2 ? dealerDetails.Address2 : ''}
          </p>
          <p
            class="s2"
            style="
              padding-top: 1pt;
              padding-left: 1pt;
              text-indent: 0pt;
              line-height: 9pt;
              text-align: left;
            "
          >
          ${dealerDetails.Address3 ? dealerDetails.Address3 : ''}
          </p>
        </td>
      </tr>
      <tr style="height: 21pt">
        <td
          style="
            width: 131pt;
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
          <p
            class="s1"
            style="
              padding-left: 46pt;
              padding-right: 45pt;
              text-indent: 0pt;
              line-height: 9pt;
              text-align: center;
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
          <p style="text-indent: 0pt; text-align: left"><br /></p>
          <p
            class="s1"
            style="
              padding-left: 1pt;
              text-indent: 0pt;
              line-height: 9pt;
              text-align: left;
            "
          >
            Unit
          </p>
        </td>
        <td
          style="
            width: 28pt;
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
            class="s1"
            style="padding-left: 1pt; text-indent: 0pt; text-align: left"
          >
            MRP
          </p>
        </td>
        <td
          style="
            width: 40pt;
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
            class="s1"
            style="padding-left: 1pt; text-indent: 0pt; text-align: left"
          >
            Qty in
          </p>
          <p
            class="s1"
            style="
              padding-top: 1pt;
              padding-left: 1pt;
              text-indent: 0pt;
              line-height: 9pt;
              text-align: left;
            "
          >
            Kg/Ltr
          </p>
        </td>
        <td
          style="
            width: 25pt;
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
            class="s1"
            style="padding-left: 1pt; text-indent: 0pt; text-align: left"
          >
            No. of
          </p>
          <p
            class="s1"
            style="
              padding-top: 1pt;
              padding-left: 1pt;
              text-indent: 0pt;
              line-height: 9pt;
              text-align: left;
            "
          >
            Units
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
            class="s1"
            style="padding-left: 1pt; text-indent: 0pt; text-align: left"
          >
            Gross
          </p>
          <p
            class="s1"
            style="
              padding-top: 1pt;
              padding-left: 1pt;
              text-indent: 0pt;
              line-height: 9pt;
              text-align: left;
            "
          >
            Amount
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
            class="s1"
            style="padding-left: 2pt; text-indent: 0pt; text-align: left"
          >
            Disc.
          </p>
          <p
            class="s1"
            style="
              padding-top: 1pt;
              padding-left: 2pt;
              text-indent: 0pt;
              line-height: 9pt;
              text-align: left;
            "
          >
            Rate
          </p>
        </td>
        <td
          style="
            width: 42pt;
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
            class="s1"
            style="padding-left: 2pt; text-indent: 0pt; text-align: left"
          >
            Discount
          </p>
          <p
            class="s1"
            style="
              padding-top: 1pt;
              padding-left: 2pt;
              text-indent: 0pt;
              line-height: 9pt;
              text-align: left;
            "
          >
            Amount
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
            class="s1"
            style="padding-left: 2pt; text-indent: 0pt; text-align: left"
          >
            Taxable
          </p>
          <p
            class="s1"
            style="
              padding-top: 1pt;
              padding-left: 2pt;
              text-indent: 0pt;
              line-height: 9pt;
              text-align: left;
            "
          >
            Value
          </p>
        </td>
        <td
          style="
            width: 44pt;
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
            class="s1"
            style="padding-left: 2pt; text-indent: 0pt; text-align: left"
          >
            GST
          </p>
          <p
            class="s1"
            style="
              padding-top: 1pt;
              padding-left: 2pt;
              text-indent: 0pt;
              line-height: 9pt;
              text-align: left;
            "
          >
            Amount
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
            class="s1"
            style="padding-left: 2pt; text-indent: 0pt; text-align: left"
          >
            Total
          </p>
          <p
            class="s1"
            style="
              padding-top: 1pt;
              padding-left: 2pt;
              text-indent: 0pt;
              line-height: 9pt;
              text-align: left;
            "
          >
            Amount
          </p>
        </td>
      </tr>
    `;
  let totalQty = 0;
  let totalGrossAmount = 0;
  let totalDiscountAmount = 0;
  let totalTaxableAmount = 0;
  let totalGSTAmount = 0;
  let totalTotalAmount = 0;
  productList.forEach(productData => {
    const currProduct = productData.product;
    const noOfUnits = productData.quantity / currProduct.Unit;
    productData.quantity = parseFloat(productData.quantity, 10).toFixed(2);
    const grossAmount = (currProduct.MRP * noOfUnits).toFixed(2);
    const discountAmount = parseFloat(
      grossAmount * (dealerDetails.Discount ? dealerDetails.Discount / 100 : 0),
      10,
    ).toFixed(2);
    const taxableAmount = (grossAmount - discountAmount).toFixed(2);
    const gstAmount = parseFloat(
      taxableAmount * ((currProduct.GST ? currProduct.GST : 0) / 100),
      10,
    ).toFixed(2);
    const totalAmount = parseFloat(taxableAmount + gstAmount, 10).toFixed(2);

    totalQty += Number(productData.quantity);
    totalGrossAmount += Number(grossAmount);
    if (productData.type === 'Regular') {
      totalDiscountAmount += Number(discountAmount);
      totalTaxableAmount += Number(taxableAmount);
      totalGSTAmount += Number(gstAmount);
      totalTotalAmount += Number(totalAmount);
    }
    console.log('type: ', productData.type);

    html += `
    <tr style="height: 10pt">
        <td
          style="
            width: 131pt;
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
            class="s2"
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
            class="s2"
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
            width: 28pt;
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
            class="s2"
            style="
              padding-left: 4pt;
              text-indent: 0pt;
              line-height: 9pt;
              text-align: left;
            "
          >
            ${currProduct.MRP}
          </p>
        </td>
        <td
          style="
            width: 40pt;
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
            class="s2"
            style="text-indent: 0pt; line-height: 9pt; text-align: right"
          >
            ${productData.quantity}
          </p>
        </td>
        <td
          style="
            width: 25pt;
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
            class="s2"
            style="
              padding-left: 7pt;
              padding-right: 5pt;
              text-indent: 0pt;
              line-height: 9pt;
              text-align: center;
            "
          >
            ${noOfUnits}
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
            class="s2"
            style="text-indent: 0pt; line-height: 9pt; text-align: right"
          >
            ${grossAmount}
          </p>
        </td>
        `;
    if (productData.type === 'Regular') {
      html += `
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
            class="s2"
            style="text-indent: 0pt; line-height: 9pt; text-align: right"
          >
            ${dealerDetails.Discount}%
          </p>
        </td>
        <td
          style="
            width: 42pt;
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
            class="s2"
            style="text-indent: 0pt; line-height: 9pt; text-align: right"
          >
            ${discountAmount}
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
            class="s2"
            style="
              padding-left: 12pt;
              text-indent: 0pt;
              line-height: 9pt;
              text-align: left;
            "
          >
            ${taxableAmount}
          </p>
        </td>
        <td
          style="
            width: 44pt;
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
            class="s2"
            style="
              padding-left: 14pt;
              text-indent: 0pt;
              line-height: 9pt;
              text-align: left;
            "
          >
            ${gstAmount}
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
            class="s2"
            style="text-indent: 0pt; line-height: 9pt; text-align: right"
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
            width: 158pt;
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
            class="s1"
            style="
              padding-left: 2pt;
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
            class="s2"
            style="text-indent: 0pt; line-height: 9pt; text-align: right"
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
            width: 158pt;
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
            class="s1"
            style="
              padding-left: 2pt;
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
            class="s2"
            style="text-indent: 0pt; line-height: 9pt; text-align: right"
          >
            0.00
          </p>
        </td>
      </tr>
        `;
    }
  });
  html += `
  <tr style="height: 10pt">
  <td
    style="
      width: 131pt;
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
      class="s2"
      style="
        padding-right: 1pt;
        text-indent: 0pt;
        line-height: 9pt;
        text-align: right;
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
      width: 28pt;
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
      width: 40pt;
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
      class="s2"
      style="text-indent: 0pt; line-height: 9pt; text-align: right"
    >
      ${totalQty.toFixed(2)}
    </p>
  </td>
  <td
    style="
      width: 25pt;
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
      class="s2"
      style="text-indent: 0pt; line-height: 9pt; text-align: right"
    >
      ${totalGrossAmount.toFixed(2)}
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
    <p style="text-indent: 0pt; text-align: left"><br /></p>
  </td>
  <td
    style="
      width: 42pt;
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
      class="s2"
      style="text-indent: 0pt; line-height: 9pt; text-align: right"
    >
      ${totalDiscountAmount.toFixed(2)}
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
      class="s2"
      style="
        padding-left: 12pt;
        text-indent: 0pt;
        line-height: 9pt;
        text-align: left;
      "
    >
      ${totalTaxableAmount.toFixed(2)}
    </p>
  </td>
  <td
    style="
      width: 44pt;
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
      class="s2"
      style="
        padding-left: 14pt;
        text-indent: 0pt;
        line-height: 9pt;
        text-align: left;
      "
    >
      ${totalGSTAmount.toFixed(2)}
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
      class="s2"
      style="text-indent: 0pt; line-height: 9pt; text-align: right"
    >
      ${totalTotalAmount.toFixed(2)}
    </p>
  </td>
</tr>
  `;
  let cashDiscount = (
    totalTotalAmount *
    (dealerDetails.CashDiscount ? dealerDetails.CashDiscount / 100 : 0)
  ).toFixed(2);
  let invoiceAmount = (totalTotalAmount - cashDiscount).toFixed(2);
  html += `
  <tr style="height: 10pt">
        <td
          style="
            width: 326pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-right-style: solid;
            border-right-width: 1pt;
          "
          colspan="7"
          rowspan="2"
        >
          <p style="text-indent: 0pt; text-align: left"><br /></p>
        </td>
        <td
          style="
            width: 90pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-right-style: solid;
            border-right-width: 1pt;
          "
          colspan="2"
        >
          <p
            class="s2"
            style="
              padding-left: 2pt;
              text-indent: 0pt;
              line-height: 9pt;
              text-align: left;
            "
          >
            Cash Discount
          </p>
        </td>
        <td
          style="
            width: 44pt;
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
            class="s2"
            style="text-indent: 0pt; line-height: 9pt; text-align: right"
          >
            ${dealerDetails.CashDiscount}%
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
            class="s2"
            style="text-indent: 0pt; line-height: 9pt; text-align: right"
          >
            ${cashDiscount}
          </p>
        </td>
      </tr>
      <tr style="height: 10pt">
        <td
          style="
            width: 90pt;
            border-top-style: solid;
            border-top-width: 1pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-right-style: solid;
            border-right-width: 1pt;
          "
          colspan="2"
        >
          <p
            class="s2"
            style="
              padding-left: 2pt;
              text-indent: 0pt;
              line-height: 9pt;
              text-align: left;
            "
          >
            Invoice Amount
          </p>
        </td>
        <td
          style="
            width: 44pt;
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
            class="s2"
            style="text-indent: 0pt; line-height: 9pt; text-align: right"
          >
            ${invoiceAmount}
          </p>
        </td>
      </tr>
      <tr style="height: 53pt">
        <td
          style="
            width: 507pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-right-style: solid;
            border-right-width: 1pt;
          "
          colspan="11"
        >
          <p style="text-indent: 0pt; text-align: left"><br /></p>
          <p
            class="s1"
            style="
              padding-left: 321pt;
              padding-right: 43pt;
              text-indent: 0pt;
              text-align: center;
            "
          >
            For Sanzyme Biologics Private Limited
          </p>
          <p style="text-indent: 0pt; text-align: left"><br /></p>
          <p
            class="s2"
            style="
              padding-left: 321pt;
              padding-right: 43pt;
              text-indent: 0pt;
              line-height: 9pt;
              text-align: center;
            "
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
