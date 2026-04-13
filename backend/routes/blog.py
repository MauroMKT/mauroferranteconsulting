import logging

logger = logging.getLogger(__name__)


def setup_blog_routes(router, db):
    @router.get("/blog/{slug}/reactions")
    async def get_blog_reactions(slug: str):
        doc = await db.blog_reactions.find_one({"slug": slug}, {"_id": 0})
        if not doc:
            return {"slug": slug, "reactions": {"like": 0, "love": 0, "insightful": 0, "fire": 0}}
        return {"slug": slug, "reactions": doc.get("reactions", {"like": 0, "love": 0, "insightful": 0, "fire": 0})}

    @router.post("/blog/{slug}/react")
    async def blog_react(slug: str, body: dict):
        reaction = body.get("reaction")
        previous = body.get("previous")

        valid_reactions = {"like", "love", "insightful", "fire"}
        if reaction not in valid_reactions:
            return {"ok": False, "message": "Invalid reaction"}

        update = {f"reactions.{reaction}": 1}
        if previous and previous in valid_reactions:
            update[f"reactions.{previous}"] = -1

        await db.blog_reactions.update_one(
            {"slug": slug},
            {
                "$inc": update,
                "$setOnInsert": {"slug": slug},
            },
            upsert=True,
        )
        doc = await db.blog_reactions.find_one({"slug": slug}, {"_id": 0})
        reactions = doc.get("reactions", {}) if doc else {}
        for k in valid_reactions:
            if reactions.get(k, 0) < 0:
                await db.blog_reactions.update_one({"slug": slug}, {"$set": {f"reactions.{k}": 0}})
                reactions[k] = 0

        return {"ok": True, "reactions": reactions}
