"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/dashboard/page",{

/***/ "(app-pages-browser)/./src/components/ui/UiComponents.tsx":
/*!********************************************!*\
  !*** ./src/components/ui/UiComponents.tsx ***!
  \********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Button: function() { return /* binding */ Button; },\n/* harmony export */   Input: function() { return /* binding */ Input; },\n/* harmony export */   Modal: function() { return /* binding */ Modal; },\n/* harmony export */   Select: function() { return /* binding */ Select; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst Button = (param)=>{\n    let { children, ...props } = param;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n        ...props,\n        style: {\n            padding: \"10px\",\n            margin: \"5px\",\n            cursor: \"pointer\"\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\Lenovo\\\\Desktop\\\\doctorcelweb\\\\doctorcelweb\\\\src\\\\components\\\\ui\\\\UiComponents.tsx\",\n        lineNumber: 4,\n        columnNumber: 3\n    }, undefined);\n};\n_c = Button;\nconst Input = (param)=>{\n    let { label, error, ...props } = param;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        style: {\n            margin: \"10px 0\"\n        },\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                children: label\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Lenovo\\\\Desktop\\\\doctorcelweb\\\\doctorcelweb\\\\src\\\\components\\\\ui\\\\UiComponents.tsx\",\n                lineNumber: 9,\n                columnNumber: 5\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                ...props,\n                style: {\n                    display: \"block\",\n                    width: \"100%\",\n                    padding: \"5px\"\n                }\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Lenovo\\\\Desktop\\\\doctorcelweb\\\\doctorcelweb\\\\src\\\\components\\\\ui\\\\UiComponents.tsx\",\n                lineNumber: 10,\n                columnNumber: 5\n            }, undefined),\n            error && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                style: {\n                    color: \"red\"\n                },\n                children: error\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Lenovo\\\\Desktop\\\\doctorcelweb\\\\doctorcelweb\\\\src\\\\components\\\\ui\\\\UiComponents.tsx\",\n                lineNumber: 11,\n                columnNumber: 15\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\Lenovo\\\\Desktop\\\\doctorcelweb\\\\doctorcelweb\\\\src\\\\components\\\\ui\\\\UiComponents.tsx\",\n        lineNumber: 8,\n        columnNumber: 3\n    }, undefined);\n};\n_c1 = Input;\nconst Select = (param)=>{\n    let { label, options, error, ...props } = param;\n    var _props_value;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        style: {\n            margin: \"10px 0\"\n        },\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                children: label\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Lenovo\\\\Desktop\\\\doctorcelweb\\\\doctorcelweb\\\\src\\\\components\\\\ui\\\\UiComponents.tsx\",\n                lineNumber: 17,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"select\", {\n                ...props,\n                style: {\n                    display: \"block\",\n                    width: \"100%\",\n                    padding: \"5px\"\n                },\n                value: (_props_value = props.value) === null || _props_value === void 0 ? void 0 : _props_value.toString(),\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"option\", {\n                        value: \"\",\n                        children: \"Seleccione una opci\\xf3n\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Lenovo\\\\Desktop\\\\doctorcelweb\\\\doctorcelweb\\\\src\\\\components\\\\ui\\\\UiComponents.tsx\",\n                        lineNumber: 19,\n                        columnNumber: 9\n                    }, undefined),\n                    options.map((option)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"option\", {\n                            value: option.value.toString(),\n                            children: option.label\n                        }, option.value, false, {\n                            fileName: \"C:\\\\Users\\\\Lenovo\\\\Desktop\\\\doctorcelweb\\\\doctorcelweb\\\\src\\\\components\\\\ui\\\\UiComponents.tsx\",\n                            lineNumber: 21,\n                            columnNumber: 11\n                        }, undefined))\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\Lenovo\\\\Desktop\\\\doctorcelweb\\\\doctorcelweb\\\\src\\\\components\\\\ui\\\\UiComponents.tsx\",\n                lineNumber: 18,\n                columnNumber: 7\n            }, undefined),\n            error && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                style: {\n                    color: \"red\"\n                },\n                children: error\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Lenovo\\\\Desktop\\\\doctorcelweb\\\\doctorcelweb\\\\src\\\\components\\\\ui\\\\UiComponents.tsx\",\n                lineNumber: 24,\n                columnNumber: 17\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\Lenovo\\\\Desktop\\\\doctorcelweb\\\\doctorcelweb\\\\src\\\\components\\\\ui\\\\UiComponents.tsx\",\n        lineNumber: 16,\n        columnNumber: 5\n    }, undefined);\n};\n_c2 = Select;\nconst Modal = (param)=>{\n    let { isOpen, onClose, children } = param;\n    if (!isOpen) return null;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        style: {\n            position: \"fixed\",\n            top: 0,\n            left: 0,\n            width: \"100%\",\n            height: \"100%\",\n            background: \"rgba(0,0,0,0.5)\",\n            display: \"flex\",\n            justifyContent: \"center\",\n            alignItems: \"flex-start\",\n            overflow: \"auto\",\n            padding: \"20px 0\"\n        },\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            style: {\n                background: \"white\",\n                padding: \"20px\",\n                borderRadius: \"5px\",\n                maxWidth: \"90%\",\n                maxHeight: \"90%\",\n                overflow: \"auto\",\n                position: \"relative\"\n            },\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                    onClick: onClose,\n                    style: {\n                        position: \"absolute\",\n                        top: \"10px\",\n                        right: \"10px\",\n                        background: \"none\",\n                        border: \"none\",\n                        fontSize: \"18px\",\n                        cursor: \"pointer\"\n                    },\n                    children: \"\\xd7\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\Lenovo\\\\Desktop\\\\doctorcelweb\\\\doctorcelweb\\\\src\\\\components\\\\ui\\\\UiComponents.tsx\",\n                    lineNumber: 53,\n                    columnNumber: 11\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    style: {\n                        marginTop: \"20px\"\n                    },\n                    children: children\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\Lenovo\\\\Desktop\\\\doctorcelweb\\\\doctorcelweb\\\\src\\\\components\\\\ui\\\\UiComponents.tsx\",\n                    lineNumber: 67,\n                    columnNumber: 11\n                }, undefined)\n            ]\n        }, void 0, true, {\n            fileName: \"C:\\\\Users\\\\Lenovo\\\\Desktop\\\\doctorcelweb\\\\doctorcelweb\\\\src\\\\components\\\\ui\\\\UiComponents.tsx\",\n            lineNumber: 44,\n            columnNumber: 9\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\Lenovo\\\\Desktop\\\\doctorcelweb\\\\doctorcelweb\\\\src\\\\components\\\\ui\\\\UiComponents.tsx\",\n        lineNumber: 31,\n        columnNumber: 7\n    }, undefined);\n};\n_c3 = Modal;\nvar _c, _c1, _c2, _c3;\n$RefreshReg$(_c, \"Button\");\n$RefreshReg$(_c1, \"Input\");\n$RefreshReg$(_c2, \"Select\");\n$RefreshReg$(_c3, \"Modal\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL3VpL1VpQ29tcG9uZW50cy50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBMEI7QUFFbkIsTUFBTUMsU0FBa0U7UUFBQyxFQUFFQyxRQUFRLEVBQUUsR0FBR0MsT0FBTzt5QkFDcEcsOERBQUNDO1FBQVEsR0FBR0QsS0FBSztRQUFFRSxPQUFPO1lBQUVDLFNBQVM7WUFBUUMsUUFBUTtZQUFPQyxRQUFRO1FBQVU7a0JBQUlOOzs7Ozs7RUFDbEY7S0FGV0Q7QUFJTixNQUFNUSxRQUFtRztRQUFDLEVBQUVDLEtBQUssRUFBRUMsS0FBSyxFQUFFLEdBQUdSLE9BQU87eUJBQ3pJLDhEQUFDUztRQUFJUCxPQUFPO1lBQUVFLFFBQVE7UUFBUzs7MEJBQzdCLDhEQUFDRzswQkFBT0E7Ozs7OzswQkFDUiw4REFBQ0c7Z0JBQU8sR0FBR1YsS0FBSztnQkFBRUUsT0FBTztvQkFBRVMsU0FBUztvQkFBU0MsT0FBTztvQkFBUVQsU0FBUztnQkFBTTs7Ozs7O1lBQzFFSyx1QkFBUyw4REFBQ0s7Z0JBQUtYLE9BQU87b0JBQUVZLE9BQU87Z0JBQU07MEJBQUlOOzs7Ozs7Ozs7Ozs7RUFFNUM7TUFOV0Y7QUFRTixNQUFNUyxTQUFtSjtRQUFDLEVBQUVSLEtBQUssRUFBRVMsT0FBTyxFQUFFUixLQUFLLEVBQUUsR0FBR1IsT0FBTztRQUd4R0E7eUJBRnhGLDhEQUFDUztRQUFJUCxPQUFPO1lBQUVFLFFBQVE7UUFBUzs7MEJBQzdCLDhEQUFDRzswQkFBT0E7Ozs7OzswQkFDUiw4REFBQ1U7Z0JBQVEsR0FBR2pCLEtBQUs7Z0JBQUVFLE9BQU87b0JBQUVTLFNBQVM7b0JBQVNDLE9BQU87b0JBQVFULFNBQVM7Z0JBQU07Z0JBQUdlLEtBQUssR0FBRWxCLGVBQUFBLE1BQU1rQixLQUFLLGNBQVhsQixtQ0FBQUEsYUFBYW1CLFFBQVE7O2tDQUN6Ryw4REFBQ0M7d0JBQU9GLE9BQU07a0NBQUc7Ozs7OztvQkFDaEJGLFFBQVFLLEdBQUcsQ0FBQ0QsQ0FBQUEsdUJBQ1gsOERBQUNBOzRCQUEwQkYsT0FBT0UsT0FBT0YsS0FBSyxDQUFDQyxRQUFRO3NDQUFLQyxPQUFPYixLQUFLOzJCQUEzRGEsT0FBT0YsS0FBSzs7Ozs7Ozs7Ozs7WUFHNUJWLHVCQUFTLDhEQUFDSztnQkFBS1gsT0FBTztvQkFBRVksT0FBTztnQkFBTTswQkFBSU47Ozs7Ozs7Ozs7OztFQUU1QztNQVhTTztBQWFOLE1BQU1PLFFBQXVGO1FBQUMsRUFBRUMsTUFBTSxFQUFFQyxPQUFPLEVBQUV6QixRQUFRLEVBQUU7SUFDOUgsSUFBSSxDQUFDd0IsUUFBUSxPQUFPO0lBQ3BCLHFCQUNFLDhEQUFDZDtRQUFJUCxPQUFPO1lBQ1Z1QixVQUFVO1lBQ1ZDLEtBQUs7WUFDTEMsTUFBTTtZQUNOZixPQUFPO1lBQ1BnQixRQUFRO1lBQ1JDLFlBQVk7WUFDWmxCLFNBQVM7WUFDVG1CLGdCQUFnQjtZQUNoQkMsWUFBWTtZQUNaQyxVQUFVO1lBQ1Y3QixTQUFTO1FBQ1g7a0JBQ0UsNEVBQUNNO1lBQUlQLE9BQU87Z0JBQ1YyQixZQUFZO2dCQUNaMUIsU0FBUztnQkFDVDhCLGNBQWM7Z0JBQ2RDLFVBQVU7Z0JBQ1ZDLFdBQVc7Z0JBQ1hILFVBQVU7Z0JBQ1ZQLFVBQVU7WUFDWjs7OEJBQ0UsOERBQUN4QjtvQkFDQ21DLFNBQVNaO29CQUNUdEIsT0FBTzt3QkFDTHVCLFVBQVU7d0JBQ1ZDLEtBQUs7d0JBQ0xXLE9BQU87d0JBQ1BSLFlBQVk7d0JBQ1pTLFFBQVE7d0JBQ1JDLFVBQVU7d0JBQ1ZsQyxRQUFRO29CQUNWOzhCQUNEOzs7Ozs7OEJBR0QsOERBQUNJO29CQUFJUCxPQUFPO3dCQUFFc0MsV0FBVztvQkFBTzs4QkFDN0J6Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFLWCxFQUFFO01BN0NTdUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2NvbXBvbmVudHMvdWkvVWlDb21wb25lbnRzLnRzeD9iM2E5Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcblxyXG5leHBvcnQgY29uc3QgQnV0dG9uOiBSZWFjdC5GQzxSZWFjdC5CdXR0b25IVE1MQXR0cmlidXRlczxIVE1MQnV0dG9uRWxlbWVudD4+ID0gKHsgY2hpbGRyZW4sIC4uLnByb3BzIH0pID0+IChcclxuICA8YnV0dG9uIHsuLi5wcm9wc30gc3R5bGU9e3sgcGFkZGluZzogJzEwcHgnLCBtYXJnaW46ICc1cHgnLCBjdXJzb3I6ICdwb2ludGVyJyB9fT57Y2hpbGRyZW59PC9idXR0b24+XHJcbik7XHJcblxyXG5leHBvcnQgY29uc3QgSW5wdXQ6IFJlYWN0LkZDPFJlYWN0LklucHV0SFRNTEF0dHJpYnV0ZXM8SFRNTElucHV0RWxlbWVudD4gJiB7IGxhYmVsOiBzdHJpbmc7IGVycm9yPzogc3RyaW5nIH0+ID0gKHsgbGFiZWwsIGVycm9yLCAuLi5wcm9wcyB9KSA9PiAoXHJcbiAgPGRpdiBzdHlsZT17eyBtYXJnaW46ICcxMHB4IDAnIH19PlxyXG4gICAgPGxhYmVsPntsYWJlbH08L2xhYmVsPlxyXG4gICAgPGlucHV0IHsuLi5wcm9wc30gc3R5bGU9e3sgZGlzcGxheTogJ2Jsb2NrJywgd2lkdGg6ICcxMDAlJywgcGFkZGluZzogJzVweCcgfX0gLz5cclxuICAgIHtlcnJvciAmJiA8c3BhbiBzdHlsZT17eyBjb2xvcjogJ3JlZCcgfX0+e2Vycm9yfTwvc3Bhbj59XHJcbiAgPC9kaXY+XHJcbik7XHJcblxyXG5leHBvcnQgY29uc3QgU2VsZWN0OiBSZWFjdC5GQzxSZWFjdC5TZWxlY3RIVE1MQXR0cmlidXRlczxIVE1MU2VsZWN0RWxlbWVudD4gJiB7IGxhYmVsOiBzdHJpbmc7IG9wdGlvbnM6IHsgdmFsdWU6IG51bWJlcjsgbGFiZWw6IHN0cmluZyB9W107IGVycm9yPzogc3RyaW5nIH0+ID0gKHsgbGFiZWwsIG9wdGlvbnMsIGVycm9yLCAuLi5wcm9wcyB9KSA9PiAoXHJcbiAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpbjogJzEwcHggMCcgfX0+XHJcbiAgICAgIDxsYWJlbD57bGFiZWx9PC9sYWJlbD5cclxuICAgICAgPHNlbGVjdCB7Li4ucHJvcHN9IHN0eWxlPXt7IGRpc3BsYXk6ICdibG9jaycsIHdpZHRoOiAnMTAwJScsIHBhZGRpbmc6ICc1cHgnIH19IHZhbHVlPXtwcm9wcy52YWx1ZT8udG9TdHJpbmcoKX0+XHJcbiAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiPlNlbGVjY2lvbmUgdW5hIG9wY2nDs248L29wdGlvbj5cclxuICAgICAgICB7b3B0aW9ucy5tYXAob3B0aW9uID0+IChcclxuICAgICAgICAgIDxvcHRpb24ga2V5PXtvcHRpb24udmFsdWV9IHZhbHVlPXtvcHRpb24udmFsdWUudG9TdHJpbmcoKX0+e29wdGlvbi5sYWJlbH08L29wdGlvbj5cclxuICAgICAgICApKX1cclxuICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgIHtlcnJvciAmJiA8c3BhbiBzdHlsZT17eyBjb2xvcjogJ3JlZCcgfX0+e2Vycm9yfTwvc3Bhbj59XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG5cclxuZXhwb3J0IGNvbnN0IE1vZGFsOiBSZWFjdC5GQzx7IGlzT3BlbjogYm9vbGVhbjsgb25DbG9zZTogKCkgPT4gdm9pZDsgY2hpbGRyZW46IFJlYWN0LlJlYWN0Tm9kZSB9PiA9ICh7IGlzT3Blbiwgb25DbG9zZSwgY2hpbGRyZW4gfSkgPT4ge1xyXG4gICAgaWYgKCFpc09wZW4pIHJldHVybiBudWxsO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBzdHlsZT17e1xyXG4gICAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxyXG4gICAgICAgIHRvcDogMCxcclxuICAgICAgICBsZWZ0OiAwLFxyXG4gICAgICAgIHdpZHRoOiAnMTAwJScsXHJcbiAgICAgICAgaGVpZ2h0OiAnMTAwJScsXHJcbiAgICAgICAgYmFja2dyb3VuZDogJ3JnYmEoMCwwLDAsMC41KScsXHJcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxyXG4gICAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcclxuICAgICAgICBhbGlnbkl0ZW1zOiAnZmxleC1zdGFydCcsXHJcbiAgICAgICAgb3ZlcmZsb3c6ICdhdXRvJyxcclxuICAgICAgICBwYWRkaW5nOiAnMjBweCAwJ1xyXG4gICAgICB9fT5cclxuICAgICAgICA8ZGl2IHN0eWxlPXt7XHJcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAnd2hpdGUnLFxyXG4gICAgICAgICAgcGFkZGluZzogJzIwcHgnLFxyXG4gICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNXB4JyxcclxuICAgICAgICAgIG1heFdpZHRoOiAnOTAlJyxcclxuICAgICAgICAgIG1heEhlaWdodDogJzkwJScsXHJcbiAgICAgICAgICBvdmVyZmxvdzogJ2F1dG8nLFxyXG4gICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZSdcclxuICAgICAgICB9fT5cclxuICAgICAgICAgIDxidXR0b24gXHJcbiAgICAgICAgICAgIG9uQ2xpY2s9e29uQ2xvc2V9IFxyXG4gICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG4gICAgICAgICAgICAgIHRvcDogJzEwcHgnLFxyXG4gICAgICAgICAgICAgIHJpZ2h0OiAnMTBweCcsXHJcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogJ25vbmUnLFxyXG4gICAgICAgICAgICAgIGJvcmRlcjogJ25vbmUnLFxyXG4gICAgICAgICAgICAgIGZvbnRTaXplOiAnMThweCcsXHJcbiAgICAgICAgICAgICAgY3Vyc29yOiAncG9pbnRlcidcclxuICAgICAgICAgICAgfX1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgw5dcclxuICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Ub3A6ICcyMHB4JyB9fT5cclxuICAgICAgICAgICAge2NoaWxkcmVufVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9OyJdLCJuYW1lcyI6WyJSZWFjdCIsIkJ1dHRvbiIsImNoaWxkcmVuIiwicHJvcHMiLCJidXR0b24iLCJzdHlsZSIsInBhZGRpbmciLCJtYXJnaW4iLCJjdXJzb3IiLCJJbnB1dCIsImxhYmVsIiwiZXJyb3IiLCJkaXYiLCJpbnB1dCIsImRpc3BsYXkiLCJ3aWR0aCIsInNwYW4iLCJjb2xvciIsIlNlbGVjdCIsIm9wdGlvbnMiLCJzZWxlY3QiLCJ2YWx1ZSIsInRvU3RyaW5nIiwib3B0aW9uIiwibWFwIiwiTW9kYWwiLCJpc09wZW4iLCJvbkNsb3NlIiwicG9zaXRpb24iLCJ0b3AiLCJsZWZ0IiwiaGVpZ2h0IiwiYmFja2dyb3VuZCIsImp1c3RpZnlDb250ZW50IiwiYWxpZ25JdGVtcyIsIm92ZXJmbG93IiwiYm9yZGVyUmFkaXVzIiwibWF4V2lkdGgiLCJtYXhIZWlnaHQiLCJvbkNsaWNrIiwicmlnaHQiLCJib3JkZXIiLCJmb250U2l6ZSIsIm1hcmdpblRvcCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/ui/UiComponents.tsx\n"));

/***/ })

});