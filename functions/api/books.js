export async function onRequestGet(context) {
    const ps = context.env.D1_EIRRW.prepare(`
        select
            b.title as title,
            a.lastName as authorLast,
            a.firstName as authorFirst,
            b.releaseDate as release,
            b.addedDate as added,
            b.readDate as read,
            s.name as series,
            sb.entry as seriesEntry,
            b.recommend as recommendBook,
            s.recommend as recommendSeries
        from 
            book b
        left join authorBook ab
            on b.bookId = ab.bookId
        left join author a
            on a.authorId = ab.authorId
        left join seriesBook sb
            on b.bookId = sb.bookId
        left join series s
            on s.seriesId = sb.seriesId;
    `);


    const data = await ps.all();

    console.log(data);

    return Response.json(data ?? {});
}