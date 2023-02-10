export default {
  "commands": {
    "archive": {
      "desc": "Actions sur le PCU (Parpaing Cinématic Universe).",
      "subc": {

        "get": {
          "desc": "Tombe dans le rabbit hole RDP."
        },

        "fetch": {
          "desc": "Cherche un post avec son ID/alias.",
          "options": {
            "référence": "La #référence du #post à #chercher."
          }
        },
        "random": {
          "desc": "Plouf plouf en fonction d'un tag ca fait pop merevoreobese (faux)",
          "options": {
            "tag": "Le tag à parcourir (ou pas si tu veux tout)."
          }
        },
        "create": {
          "desc": "Hop on crée un souvenir (Fichier ET/OU commentaire obligatoire)",
          "options": {
            "tag": "La catégorie dans laquelle le post doit être rangé. (optionnel)",
            "fichier": "Ta meilleure image a rentrer dans la base de donnée.",
            "commentaire": "Met un truc drole la si y'a pas d'image.",
            "alias": "Un petit nom pour retrouver le post plus facilement. (optionnel)"
          }
        },
        "delete": {
          "desc": "DEGAGE DE LA",
          "options": {
            "id": "L'ID du post à renvoyer dans son pays."
          }
        },
        "alias": {
          "desc": "Associe à un post un alias (peut être réécrit).",
          "options": {
            "id": "L'ID du post à nommer",
            "alias": "Le petit nom du post."
          }
        }
      }
    },
    "chess": {
      "desc": "Les 🤓 commandes 🤓 relatives 🤓 aux 🤓 échecs 🤓🤓🤓 (le jeu là pas ta vie).",
      "subc": {
        "makeGif": {
          "desc": "Crée un GIF à partir d'un PGN et l'envoie dans le chat.",
          "options": {
            "pgn": "Le PGN de la partie à imager."
          }
        },
  
        "db": {
          "desc": "Une base de données des parties du parpaing. Créé pour les parties entre membres."
        },
        "create": {
          "desc": "Ajouter une partie à la base de données.",
          "options": {
            "pgn": "Le PGN de la partie à ajouter",
            "blancs": "Le membre qui a joué les blancs",
            "noirs": "Le membre qui a joué les noirs",
            "resultat": "Le résultat de la partie."
          }
        },
        "delete": {
          "desc": "Supprimer une partie de la base de données.",
          "options": {
            "id": "L'ID de la partie à supprimer."
          }
        },
        "fetchUser": {
          "desc": "Chercher les parties d'un membre.",
          "options": {
            "membre": "Le membre à chercher. (pas le bras genre ptdrrrrrrrrr)"
          }
        },
        "fetch": {
          "desc": "Retrouver une partie avec son ID.",
          "options": {
            "id": "L'ID de la partie à trouver."
          }
        }
      }
    }
  }
}