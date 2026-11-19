# ওয়েবসাইট নিজে সম্পাদনা করার সহজ নির্দেশনা

এই পোর্টফোলিও ওয়েবসাইটে `.pages.yml` আগে থেকেই যুক্ত করা হয়েছে। সাইট GitHub-এ প্রকাশ করার পর Pages CMS ব্যবহার করে কোড না লিখেই কিছু কনটেন্ট পরিবর্তন করা যাবে।

## প্রথমবার সেটআপ

1. ওয়েবসাইটের ফাইলগুলো আপনার GitHub repository-তে প্রকাশ করুন।
2. ব্রাউজারে `https://app.pagescms.org/` খুলুন।
3. আপনার GitHub account দিয়ে Sign in করুন।
4. Pages CMS-কে আপনার ওয়েবসাইটের repository-তে access দিন।
5. Repository খুললে এটি `.pages.yml` ফাইল থেকে সম্পাদনার ফর্ম দেখাবে।

## কোন কোন বিষয় বদলাতে পারবেন

**Site text and contact details**
- ইংরেজি এবং আরবি লেখাগুলো আলাদাভাবে পরিবর্তন।
- Email, WhatsApp, LinkedIn ঠিকানা পরিবর্তন।
- Profile photo এবং office background photo বদলানো।
- মূল Navy, Mint ও background রং বদলানো (Hex color code দিয়ে)।
- Text size scale সামান্য বড়/ছোট করা (`0.90` থেকে `1.15`-এর মধ্যে রাখুন)।

**Portfolio project previews**
- Project title, description, target market এবং source note পরিবর্তন।
- প্রতিটি প্রকল্পের public sample rows পরিবর্তন।
- Full decision-maker name ও job title সংশোধন।
- Email, phone ও LinkedIn-এর masked preview পরিবর্তন।
- Source workbook-এর প্রকৃত status অনুযায়ী email status ঠিক রাখা।

## পরিবর্তন সাইটে প্রকাশ করার নিয়ম

Pages CMS-এ Save করলে পরিবর্তনগুলো GitHub repository-তে commit হয়। GitHub Pages সেই ফাইলগুলো প্রকাশ করে। পরিবর্তন প্রকাশ হতে কিছুটা সময় লাগতে পারে।

## গুরুত্বপূর্ণ সতর্কতা

- GitHub password, API key বা token কোনো ওয়েবপেজে লিখবেন না।
- Original Excel lead lists public repository-তে upload করবেন না।
- Email status `Verified` লিখবেন শুধু তখনই, যখন source file বা যাচাই প্রক্রিয়া সেটি সমর্থন করে।
- এই CMS দিয়ে text, contact, sample project data, ছবি এবং নির্দিষ্ট theme setting বদলানো যাবে। পুরো page layout নতুন করে সাজানো বা section drag-and-drop করে স্থানান্তর করার সুবিধা এই সংস্করণে নেই।
