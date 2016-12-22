export default function convertToDate(date: Date|string|null): Date|null {
    return date ? new Date(date) : null;
}
