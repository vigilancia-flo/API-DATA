import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar.jsx";
import EndemiasFilter from "../../components/EndemiasFilter.jsx";
import ButtonTheme from "../../components/ButtonTheme.jsx";
import {
  Map,
  MapGeoJSON,
  MapMarker,
  MarkerContent,
  MarkerLabel,
  MarkerPopup,
} from "../../components/ui/map.jsx";
import {
  Activity,
  Map as MapIcon,
  Star,
  Navigation,
  Clock,
  ExternalLink,
} from "lucide-react";
import "maplibre-gl/dist/maplibre-gl.css";
import { Button } from "@/components/ui/button";

// importação de imagens para o maps ----------
// imagens das ubs do perimetro urbano
import postodeSaudeTaboca from "../../assets/ubs/PostodeSaúdedaTaboca.jpg";
import JasminaBucar from "../../assets/ubs/jasminabucar.jpg";
import VianaCarvalho from "../../assets/ubs/vianacarvalho.jpg";
import santaCruz from "../../assets/ubs/santacruz.png";
import ubsFloriano from "../../assets/ubs/ubsfloriano.jpg";
import dirceuArcoverde from "../../assets/ubs/dirceuarcoverde.png";
import joseParaguassu from "../../assets/ubs/joseparaguassu.jpg";
import theodoroSobral from "../../assets/ubs/theodoroSobral.jpg";
import pedroSimplicio from "../../assets/ubs/pedroSimplicio.jpg";
import alfedroCarvalho from "../../assets/ubs/alfredoCarvalho.jpg";
import defaultImage from "../../assets/ubs/defaultImage.png";
import RaimundoFilho from "../../assets/ubs/ubsRaimundoFilho.png";
// imagens das ubs do perimetro rural
import MargaridaAlvez from "../../assets/ubs/MargaridaAlvez.jpeg";
import RaimundoBenvindoLima from "../../assets/ubs/RaimundoBenvindoLima.jpeg";
import Morrinhos from "../../assets/ubs/Morrinhos.jpeg";
import RosaRodriguesCamelo from "../../assets/ubs/RosaRodriguesCamelo.jpeg";
import ProtasioMoraes from "../../assets/ubs/ProtasioMoraes.png";
import UbsL3 from "../../assets/ubs/UbsL3.jpeg";

const MAP_STYLES = {
  light: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
  dark: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
  openstreetmap: "https://tiles.openfreemap.org/styles/bright",
  openstreetmap3d: "https://tiles.openfreemap.org/styles/liberty",
};

const bairrosFlorianoGeoJSON = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        name: "PERIMETRO_URBANO_FLORIANO",
        color: "#808080",
        fill: "rgba(197, 197, 197, 1)",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-43.0442909, -6.7629866],
            [-43.0429368, -6.762891],
            [-43.03996, -6.7628394],
            [-43.0360866, -6.7634792],
            [-43.0325192, -6.7637045],
            [-43.0252404, -6.7633668],
            [-43.0220875, -6.7630751],
            [-43.0200923, -6.7628904],
            [-43.0193946, -6.7625388],
            [-43.0184563, -6.762419],
            [-43.0175475, -6.7624607],
            [-43.0155735, -6.7619709],
            [-43.0137749, -6.7614907],
            [-43.0120537, -6.7609434],
            [-43.0088627, -6.7599765],
            [-43.0059537, -6.758313],
            [-43.0014882, -6.758526],
            [-43.0001809, -6.7570535],
            [-42.9985096, -6.7573279],
            [-42.9969635, -6.7569529],
            [-42.9953674, -6.7568266],
            [-42.9955923, -6.7576306],
            [-42.9946927, -6.7616954],
            [-42.9940538, -6.7622055],
            [-42.9941637, -6.7626448],
            [-42.9944417, -6.7633503],
            [-42.9924455, -6.7640606],
            [-42.9906233, -6.764815],
            [-42.9914389, -6.7660984],
            [-42.9912152, -6.766925],
            [-42.991323, -6.7680365],
            [-42.9921091, -6.7681561],
            [-42.9940893, -6.7675196],
            [-42.9958874, -6.7671389],
            [-42.997402, -6.7669574],
            [-42.9980288, -6.7690968],
            [-42.9988554, -6.7708944],
            [-42.997874, -6.7724342],
            [-42.997874, -6.7731164],
            [-42.9988547, -6.7743807],
            [-43.0027145, -6.7744275],
            [-43.0028924, -6.7764464],
            [-43.0015839, -6.7778355],
            [-43.0003738, -6.7791911],
            [-42.9994803, -6.7804312],
            [-42.9987751, -6.7801122],
            [-42.9939775, -6.7785582],
            [-42.993309, -6.7812331],
            [-42.9940396, -6.78129],
            [-42.9947703, -6.7816883],
            [-42.992175, -6.7830974],
            [-42.9911993, -6.7843434],
            [-42.991926, -6.7855005],
            [-42.9915666, -6.7863729],
            [-42.9912994, -6.7867373],
            [-42.9909, -6.7865655],
            [-42.9903609, -6.7867373],
            [-42.9899016, -6.7873123],
            [-42.9898526, -6.7882199],
            [-42.9893903, -6.7885812],
            [-42.9887921, -6.7890656],
            [-42.9883077, -6.7887684],
            [-42.988061, -6.7886752],
            [-42.9877853, -6.7887769],
            [-42.9872142, -6.7889568],
            [-42.9855064, -6.7891658],
            [-42.9814903, -6.7910497],
            [-42.9815917, -6.7916855],
            [-42.9820933, -6.7921065],
            [-42.9819108, -6.7934718],
            [-42.9804781, -6.7932584],
            [-42.9796042, -6.7936282],
            [-42.9784868, -6.7945245],
            [-42.9787017, -6.7953069],
            [-42.9798918, -6.7961109],
            [-42.9804692, -6.7968191],
            [-42.9815233, -6.7974182],
            [-42.9823287, -6.7972024],
            [-42.9830275, -6.7967748],
            [-42.9842226, -6.7961141],
            [-42.9848276, -6.7974717],
            [-42.987054, -6.8026621],
            [-42.9882922, -6.8043985],
            [-42.9909973, -6.8053269],
            [-42.995, -6.808],
            [-43.0125473, -6.8100331],
            [-43.0145144, -6.8087238],
            [-43.0163614, -6.8052705],
            [-43.0120088, -6.8011809],
            [-43.0123078, -6.7989309],
            [-43.0135204, -6.7968367],
            [-43.018, -6.792],
            [-43.0190312, -6.8010167],
            [-43.0215221, -6.8050381],
            [-43.0228868, -6.8055422],
            [-43.035, -6.802],
            [-43.0383607, -6.7997855],
            [-43.0376689, -6.7983089],
            [-43.0389771, -6.7951446],
            [-43.0405537, -6.7985753],
            [-43.0426074, -6.8043388],
            [-43.0464161, -6.805294],
            [-43.0477966, -6.8006172],
            [-43.0485188, -6.8018502],
            [-43.048983, -6.8026731],
            [-43.0497632, -6.8039143],
            [-43.0508349, -6.805437],
            [-43.0542836, -6.8034707],
            [-43.0527917, -6.8009776],
            [-43.0534321, -6.8008008],
            [-43.0531665, -6.8002033],
            [-43.0536704, -6.8000699],
            [-43.0530769, -6.7987689],
            [-43.0528438, -6.7982184],
            [-43.0512887, -6.7985834],
            [-43.0509871, -6.7979189],
            [-43.047731, -6.7985938],
            [-43.0469539, -6.7959615],
            [-43.0473173, -6.7958575],
            [-43.047416, -6.7959717],
            [-43.0475118, -6.7959451],
            [-43.0475884, -6.7959184],
            [-43.0475846, -6.795789],
            [-43.0474985, -6.7954172],
            [-43.0477701, -6.7954345],
            [-43.0483933, -6.7954484],
            [-43.0487589, -6.7954553],
            [-43.0487589, -6.7957077],
            [-43.0489496, -6.7957122],
            [-43.0489496, -6.7955359],
            [-43.0489565, -6.7952835],
            [-43.0499941, -6.7953077],
            [-43.0499906, -6.7956327],
            [-43.0502311, -6.7956254],
            [-43.050474, -6.7956206],
            [-43.0504917, -6.7954881],
            [-43.0504836, -6.795322],
            [-43.0515819, -6.7953318],
            [-43.0518561, -6.7953499],
            [-43.0518158, -6.7945685],
            [-43.0515482, -6.7944273],
            [-43.0507223, -6.7944273],
            [-43.0507033, -6.7940832],
            [-43.0507328, -6.7932203],
            [-43.0507544, -6.7926496],
            [-43.0509695, -6.7922865],
            [-43.050969, -6.7919541],
            [-43.0504851, -6.7919541],
            [-43.050498, -6.7914736],
            [-43.0504593, -6.7911211],
            [-43.0504898, -6.7907616],
            [-43.0506478, -6.7898725],
            [-43.0513057, -6.7892118],
            [-43.0512779, -6.788884],
            [-43.0512108, -6.7885839],
            [-43.0510429, -6.7884255],
            [-43.0507447, -6.7878919],
            [-43.0505198, -6.7877373],
            [-43.0503468, -6.7877545],
            [-43.0502156, -6.7877432],
            [-43.0501478, -6.7877201],
            [-43.0493821, -6.7873949],
            [-43.0492901, -6.7868053],
            [-43.0479474, -6.7860819],
            [-43.0472938, -6.7856811],
            [-43.0465156, -6.7853742],
            [-43.0450277, -6.784507],
            [-43.0437445, -6.7831846],
            [-43.0432636, -6.782513],
            [-43.0437328, -6.7819994],
            [-43.0437448, -6.7815096],
            [-43.0439253, -6.781211],
            [-43.0442621, -6.7808407],
            [-43.0447517, -6.7803837],
            [-43.0448075, -6.7787347],
            [-43.0451864, -6.7775914],
            [-43.0455672, -6.7778434],
            [-43.0461024, -6.7782708],
            [-43.0465328, -6.7785941],
            [-43.0470019, -6.7784955],
            [-43.0470295, -6.7782379],
            [-43.0471233, -6.7781174],
            [-43.0475537, -6.777964],
            [-43.0480226, -6.7776698],
            [-43.0483973, -6.7774572],
            [-43.0483614, -6.77727],
            [-43.0486405, -6.7770895],
            [-43.0492449, -6.7767258],
            [-43.0492603, -6.7764604],
            [-43.0491118, -6.7764502],
            [-43.0481181, -6.7766104],
            [-43.0479647, -6.7761091],
            [-43.0478104, -6.7755662],
            [-43.0483136, -6.7753572],
            [-43.0480258, -6.7745232],
            [-43.0475805, -6.7744454],
            [-43.047365, -6.7736753],
            [-43.0483907, -6.7735875],
            [-43.0484586, -6.7724272],
            [-43.0485438, -6.7714807],
            [-43.0480374, -6.7698937],
            [-43.0477546, -6.7689061],
            [-43.0475391, -6.7688264],
            [-43.0473106, -6.7687613],
            [-43.0474221, -6.7683859],
            [-43.0475678, -6.7678665],
            [-43.0474836, -6.7668861],
            [-43.0469573, -6.7671872],
            [-43.0466071, -6.7672596],
            [-43.0450044, -6.7674369],
            [-43.0442967, -6.767758],
            [-43.0437574, -6.7678901],
            [-43.0439624, -6.7663135],
            [-43.0441021, -6.7655367],
            [-43.0446614, -6.765283],
            [-43.0451884, -6.764858],
            [-43.0446782, -6.7647111],
            [-43.0441269, -6.7645722],
            [-43.0442853, -6.7638382],
            [-43.0442909, -6.7629866],
          ],
        ],
      },
    },
    // ==================== localização das UBSs da zona urbanda ====================
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-42.9223995, -6.7835515],
            [-42.9218416, -6.7836039],
            [-42.9213913, -6.7840413],
            [-42.9210486, -6.7839149],
            [-42.920706, -6.783983],
            [-42.9205983, -6.7842552],
            [-42.9207452, -6.7845273],
            [-42.9209801, -6.7848773],
            [-42.9209312, -6.785373],
            [-42.9205396, -6.7854372],
            [-42.9205396, -6.7859136],
            [-42.9208724, -6.7860885],
            [-42.9216457, -6.7861663],
            [-42.9236402, -6.7869047],
            [-42.9237994, -6.7861663],
            [-42.9228302, -6.7857386],
            [-42.9223995, -6.7835515],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-43.2636503, -6.7873031],
            [-43.2621768, -6.7859072],
            [-43.2619618, -6.7858048],
            [-43.261777, -6.7856127],
            [-43.2612869, -6.7852199],
            [-43.2605947, -6.7847162],
            [-43.2598326, -6.7858778],
            [-43.2599003, -6.7864004],
            [-43.2603298, -6.7865009],
            [-43.2606404, -6.7869709],
            [-43.2610994, -6.7874179],
            [-43.2604887, -6.7888999],
            [-43.2608735, -6.7892473],
            [-43.2615471, -6.7894124],
            [-43.2624383, -6.7887024],
            [-43.2634196, -6.7891184],
            [-43.2632797, -6.7902476],
            [-43.2637336, -6.7901964],
            [-43.2639698, -6.7894494],
            [-43.2640747, -6.7887198],
            [-43.2636503, -6.7873031],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-43.0240151, -6.8598656],
            [-43.0225123, -6.8598926],
            [-43.0215693, -6.8605093],
            [-43.0206049, -6.8607716],
            [-43.0199612, -6.8618268],
            [-43.01892, -6.8639481],
            [-43.0176003, -6.8676048],
            [-43.0172191, -6.868817],
            [-43.0167452, -6.8693621],
            [-43.0165949, -6.8694769],
            [-43.0165776, -6.8696548],
            [-43.0166874, -6.8698843],
            [-43.0169718, -6.8700708],
            [-43.017119, -6.8703259],
            [-43.0174204, -6.8703989],
            [-43.0176698, -6.8701614],
            [-43.0179882, -6.8696969],
            [-43.0185469, -6.8689615],
            [-43.0196475, -6.8675137],
            [-43.0214024, -6.8656786],
            [-43.0225049, -6.8636708],
            [-43.0231622, -6.8627625],
            [-43.0238206, -6.8617219],
            [-43.0242771, -6.8604007],
            [-43.0240151, -6.8598656],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-42.9980265, -7.0702096],
            [-42.997402, -7.070017],
            [-42.9968703, -7.0704274],
            [-42.996543, -7.0703348],
            [-42.9960388, -7.0700114],
            [-42.9954915, -7.0702219],
            [-42.9955189, -7.0707651],
            [-42.995731, -7.071254],
            [-42.995941, -7.0722206],
            [-42.997373, -7.0718064],
            [-42.9975167, -7.0713219],
            [-42.9980265, -7.0702096],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-42.8066953, -6.91192],
            [-42.8059147, -6.9104759],
            [-42.806023, -6.9091927],
            [-42.8050947, -6.909013],
            [-42.8043932, -6.909038],
            [-42.8039124, -6.9098536],
            [-42.8033891, -6.9099564],
            [-42.8030666, -6.9102283],
            [-42.8024292, -6.9116708],
            [-42.8011235, -6.9128964],
            [-42.8004065, -6.9129543],
            [-42.799531, -6.9126812],
            [-42.7992975, -6.9125157],
            [-42.7988389, -6.9125157],
            [-42.7984066, -6.9126642],
            [-42.7973894, -6.9135995],
            [-42.7963221, -6.9147335],
            [-42.7963138, -6.9160165],
            [-42.7958356, -6.9167477],
            [-42.8060956, -6.9142206],
            [-42.8063958, -6.9140137],
            [-42.806304, -6.9133018],
            [-42.8066953, -6.91192],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-42.9117771, -7.314689],
            [-42.911246, -7.3149923],
            [-42.9105978, -7.3157088],
            [-42.9102124, -7.3165328],
            [-42.9094808, -7.3166136],
            [-42.9085534, -7.3175063],
            [-42.9070704, -7.3188933],
            [-42.9063336, -7.3207159],
            [-42.9066826, -7.3217663],
            [-42.908193, -7.3226981],
            [-42.9103178, -7.3229021],
            [-42.9125225, -7.3215425],
            [-42.9142149, -7.3198907],
            [-42.9130086, -7.3176648],
            [-42.9125383, -7.3163619],
            [-42.9117771, -7.314689],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-42.9012671, -7.2664139],
            [-42.9010145, -7.266384],
            [-42.9006354, -7.2664676],
            [-42.9003886, -7.2666775],
            [-42.9002197, -7.2670126],
            [-42.9000063, -7.26733],
            [-42.89994791754921, -7.2676810630162265],
            [-42.8997188, -7.2714494],
            [-42.9000373, -7.2729098],
            [-42.9011802, -7.2731032],
            [-42.9027433, -7.2727504],
            [-42.9037869, -7.2716243],
            [-42.9049038, -7.2717696],
            [-42.9053665, -7.2712239],
            [-42.9043597, -7.2703418],
            [-42.9036799, -7.2704581],
            [-42.9028557, -7.2700762],
            [-42.9028557, -7.2693601],
            [-42.9027433, -7.269244],
            [-42.902517, -7.2691995],
            [-42.9019876, -7.2691637],
            [-42.9012209, -7.2689253],
            [-42.9010164, -7.2686807],
            [-42.9010525, -7.2681913],
            [-42.9011608, -7.2676542],
            [-42.901237, -7.2670703],
            [-42.9013574, -7.2666287],
            [-42.9012671, -7.2664139],
          ],
        ],
      },
    },
  ],
};

const marcadores = [
  {
    id: "ubsfloriano",
    name: "UBS Floriano",
    label: "UBS Floriano",
    category: "UBS",
    rating: 4,
    reviews: 2,
    hours: "07:00 AM - 5:00 PM",
    color: "#8b5cf6",
    image: ubsFloriano,
    lng: -43.02682240512934,
    lat: -6.770093782739466,
  },
  {
    id: "dirceuarcoverde",
    name: "UBS - Dirceu Arcoverde",
    label: "UBS Dirceu Arcoverde",
    category: "UBS",
    rating: 4,
    reviews: 2,
    hours: "07:00 AM - 5:00 PM",
    color: "#8b5cf6",
    image: dirceuArcoverde,
    lng: -43.035177909954896,
    lat: -6.765799779484518,
  },
  {
    id: "joseparaguassu",
    name: "UBS - José Paraguassú",
    label: "UBS - José Paraguassú",
    category: "UBS",
    rating: 4,
    reviews: 2,
    hours: "07:00 AM - 5:00 PM",
    color: "#8b5cf6",
    image: joseParaguassu,
    lng: -43.00770775101921,
    lat: -6.773752245581162,
  },
  {
    id: "santacruz",
    name: "UBS - Santa Cruz",
    label: "UBS - Santa Cruz",
    category: "UBS",
    rating: 4,
    reviews: 2,
    hours: "07:00 AM - 5:00 PM",
    color: "#8b5cf6",
    image: santaCruz,
    lng: -43.00218329805059,
    lat: -6.761697944954173,
  },
  {
    id: "teodorosobral",
    name: "UBS - Theodoro Sobral",
    label: "UBS - Theodoro Sobral",
    category: "UBS",
    rating: 4,
    reviews: 2,
    hours: "07:00 AM - 5:00 PM",
    color: "#8b5cf6",
    image: theodoroSobral,
    lng: -43.020540939559325,
    lat: -6.778873054851179,
  },
  {
    id: "pedrosimplicio",
    name: "UBS Pedro Simplicio",
    label: "UBS Pedro Simplicio",
    category: "UBS",
    rating: 4,
    reviews: 2,
    hours: "07:00 AM - 5:00 PM",
    color: "#8b5cf6",
    image: pedroSimplicio,
    lng: -43.03129938856098,
    lat: -6.780671072283543,
  },
  {
    id: "alfedrocarvalho",
    name: "UBS - Alfredo de Carvalho",
    label: "UBS - Alfredo de Carvalho",
    category: "UBS",
    rating: 4,
    reviews: 2,
    hours: "07:00 AM - 5:00 PM",
    color: "#8b5cf6",
    image: alfedroCarvalho,
    lng: -43.03492649035711,
    lat: -6.787711988762435,
  },
  {
    id: "helvidioholanda",
    name: "UBS Helvidio de Holanda Barros",
    label: "UBS Helvidio de Holanda Barros",
    category: "UBS",
    rating: 4,
    reviews: 2,
    hours: "07:00 AM - 5:00 PM",
    color: "#8b5cf6",
    image: defaultImage,
    lng: -43.02848164082034,
    lat: -6.786913028924275,
  },
  {
    id: "paulomartins",
    name: "UBS Paulo Martins",
    label: "UBS Paulo Martins",
    category: "UBS",
    rating: 4,
    reviews: 2,
    hours: "07:00 AM - 5:00 PM",
    color: "#8b5cf6",
    image: defaultImage,
    lng: -43.018652030194644,
    lat: -6.78669340844439,
  },
  {
    id: "raimundofilho",
    name: "UBS Raimundo Filho",
    label: "UBS Raimundo Filho",
    category: "UBS",
    rating: 4,
    reviews: 2,
    hours: "07:00 AM - 5:00 PM",
    color: "#8b5cf6",
    image: RaimundoFilho,
    lng: -43.012394698425496,
    lat: -6.776288849546959,
  },
  // verificar se esse realmente existe ⬇️
  {
    id: "jasminabucar",
    name: "Clínica Integrada e UBS Jasmina Bucar",
    label: "Clínica Integrada e UBS Jasmina Bucar",
    category: "UBS",
    rating: 4,
    reviews: 2,
    hours: "07:00 AM - 5:00 PM",
    color: "#8b5cf6",
    image: JasminaBucar,
    lng: -43.040365240768104,
    lat: -6.7808203604476915,
  },
  {
    id: "postosaudetaboca",
    name: "Posto de Saúde da Taboca",
    label: "Posto de Saúde da Taboca",
    category: "UBS",
    rating: 4,
    reviews: 2,
    hours: "07:00 AM - 5:00 PM",
    color: "#8b5cf6",
    image: postodeSaudeTaboca,
    lng: -43.042174574073606,
    lat: -6.770507792362777,
  },
  {
    id: "vianacarvalho",
    name: "Posto de Saúde Viana de Carvalho",
    label: "Posto de Saúde Viana de Carvalho",
    category: "UBS",
    rating: 4,
    reviews: 2,
    hours: "07:00 AM - 5:00 PM",
    color: "#8b5cf6",
    image: VianaCarvalho,
    lng: -43.01058274720951,
    lat: -6.764758882936275,
  },
  // =========== UBSs da zona rural ===========
  {
    id: "margarida",
    name: "UBS Margarida Alves",
    label: "UBS Margarida Alves",
    category: "UBS",
    rating: 4,
    reviews: 2,
    hours: "07:00 AM - 5:00 PM",
    color: "#8b5cf6",
    image: MargaridaAlvez,
    lng: -42.99622811510465,
    lat: -7.071558304760834,
  },
  // essas duas ubs tem o mesmo nome ⬇️ (porque atendem a mesma comunidadade)
  {
    id: "amolar",
    name: "UBS Raimundo Benvindo Lima",
    label: "UBS Raimundo Benvindo Lima",
    category: "UBS",
    rating: 4,
    reviews: 2,
    hours: "07:00 AM - 5:00 PM",
    color: "#8b5cf6",
    image: RaimundoBenvindoLima,
    lng: -42.907166149826985,
    lat: -7.321264212578072,
  },
  {
    id: "retiro",
    name: "UBS Retiro Amolar",
    label: "UBS Retiro Amolar",
    category: "UBS",
    rating: 4,
    reviews: 2,
    hours: "07:00 AM - 5:00 PM",
    color: "#8b5cf6",
    image: RosaRodriguesCamelo,
    lng: -42.90072202285687,
    lat: -7.267051325394482,
  },
  // ========================================
  {
    id: "morrinhos",
    name: "UBS Morrinhos",
    label: "UBS Morrinhos",
    category: "UBS",
    rating: 4,
    reviews: 2,
    hours: "07:00 AM - 5:00 PM",
    color: "#8b5cf6",
    image: Morrinhos,
    lng: -43.02380440567498,
    lat: -6.8600533934180365,
  },
  {
    id: "l3",
    name: "UBS L3",
    label: "UBS L3",
    category: "UBS",
    rating: 4,
    reviews: 2,
    hours: "07:00 AM - 5:00 PM",
    color: "#8b5cf6",
    image: UbsL3,
    lng: -42.92196772000125,
    lat: -6.785588080100101,
  },
  {
    id: "protasiodemoraes",
    name: "UBS Protásio de Moraes",
    label: "UBS Protásio de Moraes",
    category: "UBS",
    rating: 4,
    reviews: 2,
    hours: "07:00 AM - 5:00 PM",
    color: "#8b5cf6",
    image: ProtasioMoraes,
    lng: -42.802106472732234,
    lat: -6.913968407079276,
  },
  {
    id: "leonardodudima",
    name: "UBS Leonardo Dudima",
    label: "UBS Leonardo Dudima",
    category: "UBS",
    rating: 4,
    reviews: 2,
    hours: "07:00 AM - 5:00 PM",
    color: "#8b5cf6",
    image: defaultImage,
    lng: -43.262039544583175,
    lat: -6.786737604151918,
  },
];

export default function MapDengue() {
  const mapRef = useRef(null);
  const [activeStyle, setActiveStyle] = useState("light");
  const [geoData, setGeoData] = useState(bairrosFlorianoGeoJSON);
  const [loading, setLoading] = useState(true);

  const [todosPacientes, setTodosPacientes] = useState([]);
  const [endemiaSelecionada, setEndemiaSelecionada] = useState("dengue");

  const is3D = activeStyle === "openstreetmap3d";
  const navigate = useNavigate();

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.easeTo({ pitch: is3D ? 60 : 0, duration: 1000 });
    }
  }, [is3D]);

  const toggleTheme = () => {
    setActiveStyle((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8000/api/pacientes/")
      .then((res) => res.json())
      .then((data) => {
        setTodosPacientes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar mapa:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (todosPacientes.length === 0) return;

    const pacientesFiltrados = todosPacientes.filter((p) => {
      const agravo = p.id_agravo ? p.id_agravo.toUpperCase() : "";

      if (endemiaSelecionada === "dengue") {
        return agravo.includes("A90") || agravo === "";
      }
      if (endemiaSelecionada === "sifilis") {
        return (
          agravo.includes("A51") ||
          agravo.includes("A52") ||
          agravo.includes("A53")
        );
      }
      if (endemiaSelecionada === "tuberculose") {
        return agravo.includes("A15") || agravo.includes("A16");
      }
      if (endemiaSelecionada === "gerais") {
        return true;
      }

      return true;
    });

    const contagemPorBairro = {};
    pacientesFiltrados.forEach((paciente) => {
      if (paciente.endereco) {
        const partes = paciente.endereco.split(",");
        const bairroStr = partes[partes.length - 1].trim().toUpperCase();
        const bairroNormalizado = bairroStr
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        contagemPorBairro[bairroNormalizado] =
          (contagemPorBairro[bairroNormalizado] || 0) + 1;
      }
    });

    const updatedFeatures = bairrosFlorianoGeoJSON.features.map((feature) => {
      const isDarkMode =
        activeStyle === "dark" || activeStyle === "openstreetmap3d";
      const corTema = isDarkMode ? "#ffffff" : feature.properties.color;

      return {
        ...feature,
        properties: {
          ...feature.properties,
          color: corTema,
        },
      };
    });

    setGeoData({ ...bairrosFlorianoGeoJSON, features: updatedFeatures });
  }, [endemiaSelecionada, todosPacientes, activeStyle]);

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full relative ml-64">
        <header className="px-8 py-5 border-b bg-linear-to-r from-[#054060] to-indigo-600 backdrop-blur-md z-10 flex items-center justify-betweend">
          <div>
            <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
              <MapIcon className="text-white-600 size-6" />
              Mapa Epidemiológico Setorial
            </h1>
            <p className="text-sm text-white font-medium mt-0.5">
              Densidade de Casos por Bairro - Floriano, PI
            </p>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 relative">
          <div className="relative w-full h-full rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-200">
            <EndemiasFilter
              selected={endemiaSelecionada}
              onChange={setEndemiaSelecionada}
            />

            {loading ? (
              <div className="flex h-full items-center justify-center">
                <Activity className="size-8 text-blue-500 animate-spin" />
              </div>
            ) : (
              <Map
                ref={mapRef}
                center={[-43.0225, -6.7672]}
                zoom={13.5}
                styles={{
                  light: MAP_STYLES[activeStyle] || MAP_STYLES.light,
                  dark: MAP_STYLES[activeStyle] || MAP_STYLES.dark,
                }}
              >
                <MapGeoJSON
                  data={geoData}
                  fillPaint={{
                    "fill-color": ["get", "color"],
                    "fill-opacity": 0.05, // Quase transparente, para focar apenas na borda
                  }}
                  linePaint={{
                    "line-color": ["get", "color"],
                    "line-width": 3,
                    "line-dasharray": [2, 2], // Cria o efeito tracejado da sua imagem
                  }}
                />

                {marcadores.map((place) => (
                  <MapMarker
                    key={place.id}
                    longitude={place.lng}
                    latitude={place.lat}
                  >
                    <MarkerContent>
                      <div className="size-5 cursor-pointer rounded-full border-2 border-white bg-red-500 shadow-lg transition-transform h-6 w-6 hover:scale-110">
                        <p className="text-center text-white font-bold">U</p>
                      </div>
                      <MarkerLabel position="bottom">{place.label}</MarkerLabel>
                    </MarkerContent>
                    <MarkerPopup className="w-62 p-0">
                      <div className="relative h-32 overflow-hidden rounded-t-md">
                        <img
                          src={place.image}
                          alt={place.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="space-y-2 p-3">
                        <div>
                          <p className="text-muted-foreground pb-0.5 text-[11px] font-medium tracking-wide uppercase">
                            {place.category}
                          </p>
                          <h3 className="text-foreground leading-tight font-semibold">
                            {place.name}
                          </h3>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="size-3.5 fill-amber-400 text-amber-400" />
                            <span className="font-medium">{place.rating}</span>
                            <span className="text-muted-foreground">
                              ({place.reviews.toLocaleString()})
                            </span>
                          </div>
                        </div>
                        <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
                          <Clock className="size-3.5" />
                          <span>{place.hours}</span>
                        </div>
                        <div className="flex gap-2 pt-1">
                          <Button size="sm" className="flex-1">
                            <Navigation className="size-3.5" />
                            Directions
                          </Button>
                          <Button size="icon-sm" variant="outline">
                            <ExternalLink className="size-3.5" />
                          </Button>
                        </div>
                      </div>
                    </MarkerPopup>
                  </MapMarker>
                ))}
              </Map>
            )}

            <ButtonTheme
              activeStyle={activeStyle}
              setActiveStyle={setActiveStyle}
              toggleTheme={toggleTheme}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
