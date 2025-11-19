/**
 * Extract YouTube ID from various YouTube URL formats
 * @param url YouTube URL
 * @returns YouTube ID or null if not found
 */
export function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  
  // Handle direct YouTube ID (11 characters)
  if (url.length === 11 && /^[a-zA-Z0-9_-]{11}$/.test(url)) {
    return url;
  }
  
  // Regular expression to match YouTube ID in various URL formats
  const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([^#&?]{11})/;
  const match = url.match(regExp);
  
  return match ? match[1] : null;
}

/**
 * Generate YouTube thumbnail URL from YouTube ID
 * @param youtubeId YouTube ID
 * @returns YouTube thumbnail URL
 */
export function getYouTubeThumbnail(youtubeId: string): string {
  return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
}

/**
 * Validate if a YouTube thumbnail exists
 * @param youtubeId YouTube ID
 * @returns Promise that resolves to true if thumbnail exists
 */
export async function validateYouTubeThumbnail(youtubeId: string): Promise<boolean> {
  try {
    const response = await fetch(`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`);
    return response.ok;
  } catch (error) {
    console.error('Error validating YouTube thumbnail:', error);
    return false;
  }
}