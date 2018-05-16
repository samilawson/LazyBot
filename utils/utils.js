const embed = (title, description = '', fields = [], options = {}) => {
    let url = options.url || '';
    let color = options.color || randomColor();

    if (options.inline) {
        if (fields.length % 3 === 2) {
            fields.push({ name: '\u200b', value: '\u200b' });
        }
        fields.forEach(obj => {
            obj.inline = true;
        });
    }

    return new RichEmbed({ fields, video: options.video || url })
        .setTitle(title)
        .setColor(color)
        .setDescription(description)
        .setURL(url)
        .setImage(options.image)
        .setTimestamp(options.timestamp ? timestampToDate(options.timestamp) : null)
        .setFooter(options.footer === true ? randomFooter() : (options.footer ? options.footer : ''), options.footer ? global.bot.user.avatarURL : undefined)
        .setAuthor(options.author === undefined ? '' : options.author)
        .setThumbnail(options.thumbnail);
};