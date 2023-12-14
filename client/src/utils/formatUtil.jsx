// Function to calculate the timespan between the given timestamp and the current date
export const calculateTimespan = (createdAt) => {
    // Convert the provided timestamp to a Date object
    const createdDate = new Date(createdAt);
    // Get the current date
    const currentDate = new Date();

    // Calculate the difference in milliseconds between the current date and the provided timestamp
    const diffInMilliseconds = currentDate - createdDate;

    // Calculate the difference in hours, days, months, and years
    const diffInHours = diffInMilliseconds / (1000 * 60 * 60);
    const diffInDays = diffInHours / 24;
    const diffInMonths = diffInDays / 30;
    const diffInYears = diffInMonths / 12;

    // Determine the appropriate timespan category and return a formatted string
    if (diffInYears >= 1) {
        return `${Math.floor(diffInYears)} years ago`;
    } else if (diffInMonths >= 1) {
        return `${Math.floor(diffInMonths)} months ago`;
    } else {
        return `${Math.floor(diffInHours)} hours ago`;
    }
};

// Function to extract the domain from a URL
export const extractDomain = (url) => {
    try {
        // Use the URL constructor to get the hostname and remove 'www.' if present
        const domain = new URL(url).hostname;
        return domain.startsWith('www.') ? domain.slice(4) : domain;
    } catch (error) {
        // Handle invalid URLs and log an error message
        console.error('Invalid URL:', url);
        return '';
    }
};

// Function to format a timestamp into a human-readable date string
export const formatDate = (createdAt) => {
    // Convert the provided timestamp to a Date object
    const createdDate = new Date(createdAt);
    // Format the date using the 'en-US' locale with a long month, numeric day, and numeric year
    return createdDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });
};
