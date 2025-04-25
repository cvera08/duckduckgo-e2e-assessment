import { test, expect } from '@playwright/test';

test('Test Case 3 - Handle JSON and log Icon URL if exists', async ({ request }) => {
  const response = await request.get('https://api.duckduckgo.com/?q=apple&format=json');
  expect(response.ok()).toBeTruthy();

  const data = await response.json();

  // ⚠️ Icon lives inside RelatedTopics[]. Some elements might not have Icon.
  const relatedTopics = data.RelatedTopics || [];

  for (const topic of relatedTopics) {
    const icon = topic.Icon;

    if (icon && icon.URL) {
      console.log(`🖼️ Icon URL: https://duckduckgo.com${icon.URL}`);
    }
  }

  for (const topic of relatedTopics) {
    const topic_debug = topic.Topics;

    if (topic_debug) {
      if (topic_debug[0].Icon.URL) {
        console.log(`📚 Topics URL: ${JSON.stringify(topic_debug[0].Icon.URL)}`)
      }
    }
  }

});
