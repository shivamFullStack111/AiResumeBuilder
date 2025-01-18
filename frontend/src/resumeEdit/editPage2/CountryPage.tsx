import React, { useState } from "react";
import { ResumeType, UPDATE_RESUME } from "../editPage1/WorkExperience";
import Select from "react-select";
import { useLazyQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/store";
import { updateResume } from "../../store/slices/resumeSlice";

interface Props {
  resume: ResumeType | null;
}

const CountryPage: React.FC<Props> = ({ resume }) => {
  const [updateResumeInBackend] = useLazyQuery(UPDATE_RESUME);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleContinue = () => {
    dispatch(updateResume({ currentPath: window.location.href }));
    updateResumeInBackend({
      variables: {
        resumeData: { targetCountry: resume?.targetCountry },
        resumeid: resume?._id,
      },
    });

    navigate("?page=3");
  };

  return (
    <div className="w-full flex flex-col items-center py-10">
      <img src="/logo3.png" className="h-14 w-14" alt="" />
      <p className="text-3xl font-bold text-gray-700 mt-6">
        Where are you focusing your job search?
      </p>
      <p className="mt-2 text-gray-600 font-semibold text-xl">
        We can give you better advice and guidance if we know.
      </p>
      <div className="w-[200px] mt-4">
        <p className="text-gray-600 uppercase text-sm">Select a country</p>
        <Select
          onChange={(newValue) => {
            dispatch(updateResume({ targetCountry: newValue?.value }));
          }}
          placeholder={"Select a country"}
          options={Countries}
          defaultInputValue={resume?.targetCountry}
          value={{ label: resume?.targetCountry, value: resume?.targetCountry }}
        />
      </div>
      <div className="mt-6 px-8 py-3 bg-pink-200 text-gray-700 rounded-lg ">
        We'll recommend the right templates for your target country
      </div>
      {resume?.targetCountry && (
        <button
          type="button"
          onClick={handleContinue}
          className="bg-blue-500 text-white flex justify-center items-center px-36 mt-8 cursor-pointer py-3 text-lg font-semibold hover:bg-blue-600 rounded-lg"
        >
          See Templates
        </button>
      )}
    </div>
  );
};

export default CountryPage;

interface Country {
  value: string;
  label: string;
}
export const Countries: Country[] = [
  {
    value: "Afghanistan",
    label: "Afghanistan",
  },
  {
    value: "Åland Islands",
    label: "Åland Islands",
  },
  {
    value: "Albania",
    label: "Albania",
  },
  {
    value: "Algeria",
    label: "Algeria",
  },
  {
    value: "American Samoa",
    label: "American Samoa",
  },
  {
    value: "AndorrA",
    label: "AndorrA",
  },
  {
    value: "Angola",
    label: "Angola",
  },
  {
    value: "Anguilla",
    label: "Anguilla",
  },
  {
    value: "Antarctica",
    label: "Antarctica",
  },
  {
    value: "Antigua and Barbuda",
    label: "Antigua and Barbuda",
  },
  {
    value: "Argentina",
    label: "Argentina",
  },
  {
    value: "Armenia",
    label: "Armenia",
  },
  {
    value: "Aruba",
    label: "Aruba",
  },
  {
    value: "Australia",
    label: "Australia",
  },
  {
    value: "Austria",
    label: "Austria",
  },
  {
    value: "Azerbaijan",
    label: "Azerbaijan",
  },
  {
    value: "Bahamas",
    label: "Bahamas",
  },
  {
    value: "Bahrain",
    label: "Bahrain",
  },
  {
    value: "Bangladesh",
    label: "Bangladesh",
  },
  {
    value: "Barbados",
    label: "Barbados",
  },
  {
    value: "Belarus",
    label: "Belarus",
  },
  {
    value: "Belgium",
    label: "Belgium",
  },
  {
    value: "Belize",
    label: "Belize",
  },
  {
    value: "Benin",
    label: "Benin",
  },
  {
    value: "Bermuda",
    label: "Bermuda",
  },
  {
    value: "Bhutan",
    label: "Bhutan",
  },
  {
    value: "Bolivia",
    label: "Bolivia",
  },
  {
    value: "Bosnia and Herzegovina",
    label: "Bosnia and Herzegovina",
  },
  {
    value: "Botswana",
    label: "Botswana",
  },
  {
    value: "Bouvet Island",
    label: "Bouvet Island",
  },
  {
    value: "Brazil",
    label: "Brazil",
  },
  {
    value: "British Indian Ocean Territory",
    label: "British Indian Ocean Territory",
  },
  {
    value: "Brunei Darussalam",
    label: "Brunei Darussalam",
  },
  {
    value: "Bulgaria",
    label: "Bulgaria",
  },
  {
    value: "Burkina Faso",
    label: "Burkina Faso",
  },
  {
    value: "Burundi",
    label: "Burundi",
  },
  {
    value: "Cambodia",
    label: "Cambodia",
  },
  {
    value: "Cameroon",
    label: "Cameroon",
  },
  {
    value: "Canada",
    label: "Canada",
  },
  {
    value: "Cape Verde",
    label: "Cape Verde",
  },
  {
    value: "Cayman Islands",
    label: "Cayman Islands",
  },
  {
    value: "Central African Republic",
    label: "Central African Republic",
  },
  {
    value: "Chad",
    label: "Chad",
  },
  {
    value: "Chile",
    label: "Chile",
  },
  {
    value: "China",
    label: "China",
  },
  {
    value: "Christmas Island",
    label: "Christmas Island",
  },
  {
    value: "Cocos (Keeling) Islands",
    label: "Cocos (Keeling) Islands",
  },
  {
    value: "Colombia",
    label: "Colombia",
  },
  {
    value: "Comoros",
    label: "Comoros",
  },
  {
    value: "Congo",
    label: "Congo",
  },
  {
    value: "Congo, The Democratic Republic of the",
    label: "Congo, The Democratic Republic of the",
  },
  {
    value: "Cook Islands",
    label: "Cook Islands",
  },
  {
    value: "Costa Rica",
    label: "Costa Rica",
  },
  {
    value: "Cote D'Ivoire",
    label: "Cote D'Ivoire",
  },
  {
    value: "Croatia",
    label: "Croatia",
  },
  {
    value: "Cuba",
    label: "Cuba",
  },
  {
    value: "Cyprus",
    label: "Cyprus",
  },
  {
    value: "Czech Republic",
    label: "Czech Republic",
  },
  {
    value: "Denmark",
    label: "Denmark",
  },
  {
    value: "Djibouti",
    label: "Djibouti",
  },
  {
    value: "Dominica",
    label: "Dominica",
  },
  {
    value: "Dominican Republic",
    label: "Dominican Republic",
  },
  {
    value: "Ecuador",
    label: "Ecuador",
  },
  {
    value: "Egypt",
    label: "Egypt",
  },
  {
    value: "El Salvador",
    label: "El Salvador",
  },
  {
    value: "Equatorial Guinea",
    label: "Equatorial Guinea",
  },
  {
    value: "Eritrea",
    label: "Eritrea",
  },
  {
    value: "Estonia",
    label: "Estonia",
  },
  {
    value: "Ethiopia",
    label: "Ethiopia",
  },
  {
    value: "Falkland Islands (Malvinas)",
    label: "Falkland Islands (Malvinas)",
  },
  {
    value: "Faroe Islands",
    label: "Faroe Islands",
  },
  {
    value: "Fiji",
    label: "Fiji",
  },
  {
    value: "Finland",
    label: "Finland",
  },
  {
    value: "France",
    label: "France",
  },
  {
    value: "French Guiana",
    label: "French Guiana",
  },
  {
    value: "French Polynesia",
    label: "French Polynesia",
  },
  {
    value: "French Southern Territories",
    label: "French Southern Territories",
  },
  {
    value: "Gabon",
    label: "Gabon",
  },
  {
    value: "Gambia",
    label: "Gambia",
  },
  {
    value: "Georgia",
    label: "Georgia",
  },
  {
    value: "Germany",
    label: "Germany",
  },
  {
    value: "Ghana",
    label: "Ghana",
  },
  {
    value: "Gibraltar",
    label: "Gibraltar",
  },
  {
    value: "Greece",
    label: "Greece",
  },
  {
    value: "Greenland",
    label: "Greenland",
  },
  {
    value: "Grenada",
    label: "Grenada",
  },
  {
    value: "Guadeloupe",
    label: "Guadeloupe",
  },
  {
    value: "Guam",
    label: "Guam",
  },
  {
    value: "Guatemala",
    label: "Guatemala",
  },
  {
    value: "Guernsey",
    label: "Guernsey",
  },
  {
    value: "Guinea",
    label: "Guinea",
  },
  {
    value: "Guinea-Bissau",
    label: "Guinea-Bissau",
  },
  {
    value: "Guyana",
    label: "Guyana",
  },
  {
    value: "Haiti",
    label: "Haiti",
  },
  {
    value: "Heard Island and Mcdonald Islands",
    label: "Heard Island and Mcdonald Islands",
  },
  {
    value: "Holy See (Vatican City State)",
    label: "Holy See (Vatican City State)",
  },
  {
    value: "Honduras",
    label: "Honduras",
  },
  {
    value: "Hong Kong",
    label: "Hong Kong",
  },
  {
    value: "Hungary",
    label: "Hungary",
  },
  {
    value: "Iceland",
    label: "Iceland",
  },
  {
    value: "India",
    label: "India",
  },
  {
    value: "Indonesia",
    label: "Indonesia",
  },
  {
    value: "Iran, Islamic Republic Of",
    label: "Iran, Islamic Republic Of",
  },
  {
    value: "Iraq",
    label: "Iraq",
  },
  {
    value: "Ireland",
    label: "Ireland",
  },
  {
    value: "Isle of Man",
    label: "Isle of Man",
  },
  {
    value: "Israel",
    label: "Israel",
  },
  {
    value: "Italy",
    label: "Italy",
  },
  {
    value: "Jamaica",
    label: "Jamaica",
  },
  {
    value: "Japan",
    label: "Japan",
  },
  {
    value: "Jersey",
    label: "Jersey",
  },
  {
    value: "Jordan",
    label: "Jordan",
  },
  {
    value: "Kazakhstan",
    label: "Kazakhstan",
  },
  {
    value: "Kenya",
    label: "Kenya",
  },
  {
    value: "Kiribati",
    label: "Kiribati",
  },
  {
    value: "Korea, Democratic People'S Republic of",
    label: "Korea, Democratic People'S Republic of",
  },
  {
    value: "Korea, Republic of",
    label: "Korea, Republic of",
  },
  {
    value: "Kuwait",
    label: "Kuwait",
  },
  {
    value: "Kyrgyzstan",
    label: "Kyrgyzstan",
  },
  {
    value: "Lao People'S Democratic Republic",
    label: "Lao People'S Democratic Republic",
  },
  {
    value: "Latvia",
    label: "Latvia",
  },
  {
    value: "Lebanon",
    label: "Lebanon",
  },
  {
    value: "Lesotho",
    label: "Lesotho",
  },
  {
    value: "Liberia",
    label: "Liberia",
  },
  {
    value: "Libyan Arab Jamahiriya",
    label: "Libyan Arab Jamahiriya",
  },
  {
    value: "Liechtenstein",
    label: "Liechtenstein",
  },
  {
    value: "Lithuania",
    label: "Lithuania",
  },
  {
    value: "Luxembourg",
    label: "Luxembourg",
  },
  {
    value: "Macao",
    label: "Macao",
  },
  {
    value: "Macedonia, The Former Yugoslav Republic of",
    label: "Macedonia, The Former Yugoslav Republic of",
  },
  {
    value: "Madagascar",
    label: "Madagascar",
  },
  {
    value: "Malawi",
    label: "Malawi",
  },
  {
    value: "Malaysia",
    label: "Malaysia",
  },
  {
    value: "Maldives",
    label: "Maldives",
  },
  {
    value: "Mali",
    label: "Mali",
  },
  {
    value: "Malta",
    label: "Malta",
  },
  {
    value: "Marshall Islands",
    label: "Marshall Islands",
  },
  {
    value: "Martinique",
    label: "Martinique",
  },
  {
    value: "Mauritania",
    label: "Mauritania",
  },
  {
    value: "Mauritius",
    label: "Mauritius",
  },
  {
    value: "Mayotte",
    label: "Mayotte",
  },
  {
    value: "Mexico",
    label: "Mexico",
  },
  {
    value: "Micronesia, Federated States of",
    label: "Micronesia, Federated States of",
  },
  {
    value: "Moldova, Republic of",
    label: "Moldova, Republic of",
  },
  {
    value: "Monaco",
    label: "Monaco",
  },
  {
    value: "Mongolia",
    label: "Mongolia",
  },
  {
    value: "Montserrat",
    label: "Montserrat",
  },
  {
    value: "Morocco",
    label: "Morocco",
  },
  {
    value: "Mozambique",
    label: "Mozambique",
  },
  {
    value: "Myanmar",
    label: "Myanmar",
  },
  {
    value: "Namibia",
    label: "Namibia",
  },
  {
    value: "Nauru",
    label: "Nauru",
  },
  {
    value: "Nepal",
    label: "Nepal",
  },
  {
    value: "Netherlands",
    label: "Netherlands",
  },
  {
    value: "Netherlands Antilles",
    label: "Netherlands Antilles",
  },
  {
    value: "New Caledonia",
    label: "New Caledonia",
  },
  {
    value: "New Zealand",
    label: "New Zealand",
  },
  {
    value: "Nicaragua",
    label: "Nicaragua",
  },
  {
    value: "Niger",
    label: "Niger",
  },
  {
    value: "Nigeria",
    label: "Nigeria",
  },
  {
    value: "Niue",
    label: "Niue",
  },
  {
    value: "Norfolk Island",
    label: "Norfolk Island",
  },
  {
    value: "Northern Mariana Islands",
    label: "Northern Mariana Islands",
  },
  {
    value: "Norway",
    label: "Norway",
  },
  {
    value: "Oman",
    label: "Oman",
  },
  {
    value: "Pakistan",
    label: "Pakistan",
  },
  {
    value: "Palau",
    label: "Palau",
  },
  {
    value: "Palestinian Territory, Occupied",
    label: "Palestinian Territory, Occupied",
  },
  {
    value: "Panama",
    label: "Panama",
  },
  {
    value: "Papua New Guinea",
    label: "Papua New Guinea",
  },
  {
    value: "Paraguay",
    label: "Paraguay",
  },
  {
    value: "Peru",
    label: "Peru",
  },
  {
    value: "Philippines",
    label: "Philippines",
  },
  {
    value: "Pitcairn",
    label: "Pitcairn",
  },
  {
    value: "Poland",
    label: "Poland",
  },
  {
    value: "Portugal",
    label: "Portugal",
  },
  {
    value: "Puerto Rico",
    label: "Puerto Rico",
  },
  {
    value: "Qatar",
    label: "Qatar",
  },
  {
    value: "Reunion",
    label: "Reunion",
  },
  {
    value: "Romania",
    label: "Romania",
  },
  {
    value: "Russian Federation",
    label: "Russian Federation",
  },
  {
    value: "RWANDA",
    label: "RWANDA",
  },
  {
    value: "Saint Helena",
    label: "Saint Helena",
  },
  {
    value: "Saint Kitts and Nevis",
    label: "Saint Kitts and Nevis",
  },
  {
    value: "Saint Lucia",
    label: "Saint Lucia",
  },
  {
    value: "Saint Pierre and Miquelon",
    label: "Saint Pierre and Miquelon",
  },
  {
    value: "Saint Vincent and the Grenadines",
    label: "Saint Vincent and the Grenadines",
  },
  {
    value: "Samoa",
    label: "Samoa",
  },
  {
    value: "San Marino",
    label: "San Marino",
  },
  {
    value: "Sao Tome and Principe",
    label: "Sao Tome and Principe",
  },
  {
    value: "Saudi Arabia",
    label: "Saudi Arabia",
  },
  {
    value: "Senegal",
    label: "Senegal",
  },
  {
    value: "Serbia and Montenegro",
    label: "Serbia and Montenegro",
  },
  {
    value: "Seychelles",
    label: "Seychelles",
  },
  {
    value: "Sierra Leone",
    label: "Sierra Leone",
  },
  {
    value: "Singapore",
    label: "Singapore",
  },
  {
    value: "Slovakia",
    label: "Slovakia",
  },
  {
    value: "Slovenia",
    label: "Slovenia",
  },
  {
    value: "Solomon Islands",
    label: "Solomon Islands",
  },
  {
    value: "Somalia",
    label: "Somalia",
  },
  {
    value: "South Africa",
    label: "South Africa",
  },
  {
    value: "South Georgia and the South Sandwich Islands",
    label: "South Georgia and the South Sandwich Islands",
  },
  {
    value: "Spain",
    label: "Spain",
  },
  {
    value: "Sri Lanka",
    label: "Sri Lanka",
  },
  {
    value: "Sudan",
    label: "Sudan",
  },
  {
    value: "Suriname",
    label: "Suriname",
  },
  {
    value: "Svalbard and Jan Mayen",
    label: "Svalbard and Jan Mayen",
  },
  {
    value: "Swaziland",
    label: "Swaziland",
  },
  {
    value: "Sweden",
    label: "Sweden",
  },
  {
    value: "Switzerland",
    label: "Switzerland",
  },
  {
    value: "Syrian Arab Republic",
    label: "Syrian Arab Republic",
  },
  {
    value: "Taiwan, Province of China",
    label: "Taiwan, Province of China",
  },
  {
    value: "Tajikistan",
    label: "Tajikistan",
  },
  {
    value: "Tanzania, United Republic of",
    label: "Tanzania, United Republic of",
  },
  {
    value: "Thailand",
    label: "Thailand",
  },
  {
    value: "Timor-Leste",
    label: "Timor-Leste",
  },
  {
    value: "Togo",
    label: "Togo",
  },
  {
    value: "Tokelau",
    label: "Tokelau",
  },
  {
    value: "Tonga",
    label: "Tonga",
  },
  {
    value: "Trinidad and Tobago",
    label: "Trinidad and Tobago",
  },
  {
    value: "Tunisia",
    label: "Tunisia",
  },
  {
    value: "Turkey",
    label: "Turkey",
  },
  {
    value: "Turkmenistan",
    label: "Turkmenistan",
  },
  {
    value: "Turks and Caicos Islands",
    label: "Turks and Caicos Islands",
  },
  {
    value: "Tuvalu",
    label: "Tuvalu",
  },
  {
    value: "Uganda",
    label: "Uganda",
  },
  {
    value: "Ukraine",
    label: "Ukraine",
  },
  {
    value: "United Arab Emirates",
    label: "United Arab Emirates",
  },
  {
    value: "United Kingdom",
    label: "United Kingdom",
  },
  {
    value: "United States",
    label: "United States",
  },
  {
    value: "United States Minor Outlying Islands",
    label: "United States Minor Outlying Islands",
  },
  {
    value: "Uruguay",
    label: "Uruguay",
  },
  {
    value: "Uzbekistan",
    label: "Uzbekistan",
  },
  {
    value: "Vanuatu",
    label: "Vanuatu",
  },
  {
    value: "Venezuela",
    label: "Venezuela",
  },
  {
    value: "Viet Nam",
    label: "Viet Nam",
  },
  {
    value: "Virgin Islands, British",
    label: "Virgin Islands, British",
  },
  {
    value: "Virgin Islands, U.S.",
    label: "Virgin Islands, U.S.",
  },
  {
    value: "Wallis and Futuna",
    label: "Wallis and Futuna",
  },
  {
    value: "Western Sahara",
    label: "Western Sahara",
  },
  {
    value: "Yemen",
    label: "Yemen",
  },
  {
    value: "Zambia",
    label: "Zambia",
  },
  {
    value: "Zimbabwe",
    label: "Zimbabwe",
  },
];
