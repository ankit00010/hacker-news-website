export const calculateTimespan = (createdAt) => {
    const createdDate = new Date(createdAt);
    const currentDate = new Date();

    const diffInMilliseconds = currentDate - createdDate;
    const diffInHours = diffInMilliseconds / (1000 * 60 * 60);
    const diffInDays = diffInHours / 24;
    const diffInMonths = diffInDays / 30;
    const diffInYears = diffInMonths / 12;

    if (diffInYears >= 1) {
        return `${Math.floor(diffInYears)} years ago`;
    } else if (diffInMonths >= 1) {
        return `${Math.floor(diffInMonths)} months ago`;
    } else {
        return `${Math.floor(diffInHours)} hours ago`;
    }
};

export const extractDomain = (url) => {
    // Function to extract the domain from a URL
    try {
        const domain = new URL(url).hostname;
        return domain.startsWith('www.') ? domain.slice(4) : domain;
    } catch (error) {
        console.error('Invalid URL:', url);
        return '';
    }
};

export const formatDate = (createdAt) => {
    const createdDate = new Date(createdAt);
    return createdDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });
};

