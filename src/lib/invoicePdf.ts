import type { BillingInvoice } from "@/components/dashboard/dashboardData";

function sanitizeFilePart(value: string) {
  return value.replace(/[^a-zA-Z0-9_-]/g, "_");
}

function formatDate(value: string | null | undefined) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
}

export async function downloadInvoicePdf(invoice: BillingInvoice) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({
    unit: "pt",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 56;
  let y = 80;

  doc.setTextColor(245, 245, 245);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(72);
  doc.text("QUANSYND", pageWidth / 2, 430, {
    align: "center",
    angle: 35,
  });

  doc.setTextColor(20, 20, 20);
  doc.setFontSize(24);
  doc.text("Invoice", margin, y);

  y += 34;
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("QuanSynd", margin, y);
  y += 18;
  doc.text(`Invoice No: ${invoice.invoiceNumber}`, margin, y);
  y += 18;
  doc.text(`Generated: ${formatDate(invoice.createdAt)}`, margin, y);

  y += 40;
  doc.setFont("helvetica", "bold");
  doc.text("Billing Details", margin, y);
  y += 20;
  doc.setFont("helvetica", "normal");
  doc.text(`Plan: ${invoice.planTier.toUpperCase()} (${invoice.billingInterval})`, margin, y);
  y += 18;
  doc.text(`Amount: ${formatCurrency(invoice.amount, invoice.currency)}`, margin, y);
  y += 18;
  doc.text(`Status: ${invoice.status}`, margin, y);
  y += 18;
  doc.text(`Provider: ${invoice.provider}`, margin, y);
  y += 18;
  doc.text(`Payment Method: ${invoice.paymentMethod ?? "-"}`, margin, y);
  y += 18;
  doc.text(`Provider Ref: ${invoice.providerRef ?? "-"}`, margin, y);
  y += 18;
  doc.text(`Period: ${invoice.periodStart ?? "-"} to ${invoice.periodEnd ?? "-"}`, margin, y);

  y += 40;
  doc.setFont("helvetica", "italic");
  doc.setFontSize(10);
  doc.setTextColor(90, 90, 90);
  doc.text("This is a system-generated invoice from QuanSynd.", margin, y);

  const fileName = `${sanitizeFilePart(invoice.invoiceNumber)}.pdf`;
  doc.save(fileName);
}
