module.exports = {
  title: 'コンポジットテーマの提案',
  author: 'Ayumu Takai',
  language: 'ja',
  size: 'A4 landscape',
  theme: [
    '@vivliostyle/theme-slide',
    './custom-theme'
  ],
  entry: [
    'manuscript.md',
  ],
  output: 'meating_slide_202103.pdf',
  workspaceDir: '.vivliostyle',
};
