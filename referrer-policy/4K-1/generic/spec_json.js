var SPEC_JSON = {"selection_pattern": "%(source_context_list)s.%(delivery_type)s/%(delivery_value)s/%(subresource)s/%(origin)s.%(redirection)s.%(source_scheme)s", "test_file_path_pattern": "gen/%(source_context_list)s.%(delivery_type)s/%(delivery_value)s/%(subresource)s/%(origin)s.%(redirection)s.%(source_scheme)s.html", "test_description_template": "Referrer Policy: Expects %(expectation)s for %(subresource)s to %(origin)s origin and %(redirection)s redirection from %(source_scheme)s context.", "test_page_title_template": "Referrer-Policy: %(title)s", "specification": [{"name": "unset-referrer-policy", "title": "Referrer Policy is not explicitly defined", "description": "Check that referrer URL follows no-referrer-when-downgrade policy when no explicit Referrer Policy is set.", "specification_url": "https://w3c.github.io/webappsec-referrer-policy/#referrer-policies", "test_expansion": [{"name": "insecure-protocol", "expansion": "default", "source_scheme": "http", "source_context_list": "*", "delivery_type": "*", "delivery_value": null, "redirection": "*", "origin": ["same-http", "cross-http"], "subresource": "*", "expectation": "stripped-referrer"}, {"name": "upgrade-protocol", "expansion": "default", "source_scheme": "http", "source_context_list": "*", "delivery_type": "*", "delivery_value": null, "redirection": "*", "origin": ["same-https", "cross-https"], "subresource": "*", "expectation": "stripped-referrer"}, {"name": "downgrade-protocol", "expansion": "default", "source_scheme": "https", "source_context_list": "*", "delivery_type": "*", "delivery_value": null, "redirection": "*", "origin": ["same-http", "cross-http"], "subresource": "*", "expectation": "omitted"}, {"name": "secure-protocol", "expansion": "default", "source_scheme": "https", "source_context_list": "*", "delivery_type": "*", "delivery_value": null, "redirection": "*", "origin": ["same-https", "cross-https"], "subresource": "*", "expectation": "stripped-referrer"}]}, {"name": "no-referrer", "title": "Referrer Policy is set to 'no-referrer'", "description": "Check that sub-resource never gets the referrer URL.", "specification_url": "https://w3c.github.io/webappsec-referrer-policy/#referrer-policy-no-referrer", "test_expansion": [{"name": "generic", "expansion": "default", "source_scheme": "*", "source_context_list": "*", "delivery_type": "*", "delivery_value": "no-referrer", "redirection": "*", "origin": "*", "subresource": "*", "expectation": "omitted"}]}, {"name": "no-referrer-when-downgrade", "title": "Referrer Policy is set to 'no-referrer-when-downgrade'", "description": "Check that non a priori insecure subresource gets the full Referrer URL. A priori insecure subresource gets no referrer information.", "specification_url": "https://w3c.github.io/webappsec-referrer-policy/#referrer-policy-no-referrer-when-downgrade", "test_expansion": [{"name": "insecure-protocol", "expansion": "default", "source_scheme": "http", "source_context_list": "*", "delivery_type": "*", "delivery_value": "no-referrer-when-downgrade", "redirection": "*", "origin": ["same-http", "cross-http"], "subresource": "*", "expectation": "stripped-referrer"}, {"name": "upgrade-protocol", "expansion": "default", "source_scheme": "http", "source_context_list": "*", "delivery_type": "*", "delivery_value": "no-referrer-when-downgrade", "redirection": "*", "origin": ["same-https", "cross-https"], "subresource": "*", "expectation": "stripped-referrer"}, {"name": "downgrade-protocol", "expansion": "default", "source_scheme": "https", "source_context_list": "*", "delivery_type": "*", "delivery_value": "no-referrer-when-downgrade", "redirection": "*", "origin": ["same-http", "cross-http"], "subresource": "*", "expectation": "omitted"}, {"name": "secure-protocol", "expansion": "default", "source_scheme": "https", "source_context_list": "*", "delivery_type": "*", "delivery_value": "no-referrer-when-downgrade", "redirection": "*", "origin": ["same-https", "cross-https"], "subresource": "*", "expectation": "stripped-referrer"}]}, {"name": "origin", "title": "Referrer Policy is set to 'origin'", "description": "Check that all subresources in all casses get only the origin portion of the referrer URL.", "specification_url": "https://w3c.github.io/webappsec-referrer-policy/#referrer-policy-origin", "test_expansion": [{"name": "generic", "expansion": "default", "source_scheme": "*", "source_context_list": "*", "delivery_type": "*", "delivery_value": "origin", "redirection": "*", "origin": "*", "subresource": "*", "expectation": "origin"}]}, {"name": "same-origin", "title": "Referrer Policy is set to 'same-origin'", "description": "Check that cross-origin subresources get no referrer information and same-origin get the stripped referrer URL.", "specification_url": "https://w3c.github.io/webappsec-referrer-policy/#referrer-policy-same-origin", "test_expansion": [{"name": "same-origin-insecure", "expansion": "default", "source_scheme": "http", "source_context_list": "*", "delivery_type": "*", "delivery_value": "same-origin", "redirection": "*", "origin": "same-http", "subresource": "*", "expectation": "stripped-referrer"}, {"name": "same-origin-secure-default", "expansion": "default", "source_scheme": "https", "source_context_list": "*", "delivery_type": "*", "delivery_value": "same-origin", "redirection": "*", "origin": "same-https", "subresource": "*", "expectation": "stripped-referrer"}, {"name": "same-origin-insecure", "expansion": "override", "source_scheme": "*", "source_context_list": "*", "delivery_type": "*", "delivery_value": "same-origin", "redirection": "swap-origin", "origin": ["same-http", "same-https"], "subresource": "*", "expectation": "omitted"}, {"name": "cross-origin", "expansion": "default", "source_scheme": "*", "source_context_list": "*", "delivery_type": "*", "delivery_value": "same-origin", "redirection": "*", "origin": ["cross-http", "cross-https"], "subresource": "*", "expectation": "omitted"}]}, {"name": "origin-when-cross-origin", "title": "Referrer Policy is set to 'origin-when-cross-origin'", "description": "Check that cross-origin subresources get the origin portion of the referrer URL and same-origin get the stripped referrer URL.", "specification_url": "https://w3c.github.io/webappsec-referrer-policy/#referrer-policy-origin-when-cross-origin", "test_expansion": [{"name": "same-origin-insecure", "expansion": "default", "source_scheme": "http", "source_context_list": "*", "delivery_type": "*", "delivery_value": "origin-when-cross-origin", "redirection": "*", "origin": "same-http", "subresource": "*", "expectation": "stripped-referrer"}, {"name": "same-origin-secure-default", "expansion": "default", "source_scheme": "https", "source_context_list": "*", "delivery_type": "*", "delivery_value": "origin-when-cross-origin", "redirection": "*", "origin": "same-https", "subresource": "*", "expectation": "stripped-referrer"}, {"name": "same-origin-upgrade", "expansion": "default", "source_scheme": "http", "source_context_list": "*", "delivery_type": "*", "delivery_value": "origin-when-cross-origin", "redirection": "*", "origin": "same-https", "subresource": "*", "expectation": "origin"}, {"name": "same-origin-downgrade", "expansion": "default", "source_scheme": "https", "source_context_list": "*", "delivery_type": "*", "delivery_value": "origin-when-cross-origin", "redirection": "*", "origin": "same-http", "subresource": "*", "expectation": "origin"}, {"name": "same-origin-insecure", "expansion": "override", "source_scheme": "*", "source_context_list": "*", "delivery_type": "*", "delivery_value": "origin-when-cross-origin", "redirection": "swap-origin", "origin": ["same-http", "same-https"], "subresource": "*", "expectation": "origin"}, {"name": "cross-origin", "expansion": "default", "source_scheme": "*", "source_context_list": "*", "delivery_type": "*", "delivery_value": "origin-when-cross-origin", "redirection": "*", "origin": ["cross-http", "cross-https"], "subresource": "*", "expectation": "origin"}]}, {"name": "strict-origin", "title": "Referrer Policy is set to 'strict-origin'", "description": "Check that non a priori insecure subresource gets only the origin portion of the referrer URL. A priori insecure subresource gets no referrer information.", "specification_url": "https://w3c.github.io/webappsec-referrer-policy/#referrer-policy-strict-origin", "test_expansion": [{"name": "insecure-protocol", "expansion": "default", "source_scheme": "http", "source_context_list": "*", "delivery_type": "*", "delivery_value": "strict-origin", "redirection": "*", "origin": ["same-http", "cross-http"], "subresource": "*", "expectation": "origin"}, {"name": "upgrade-protocol", "expansion": "default", "source_scheme": "http", "source_context_list": "*", "delivery_type": "*", "delivery_value": "strict-origin", "redirection": "*", "origin": ["same-https", "cross-https"], "subresource": "*", "expectation": "origin"}, {"name": "downgrade-protocol", "expansion": "default", "source_scheme": "https", "source_context_list": "*", "delivery_type": "*", "delivery_value": "strict-origin", "redirection": "*", "origin": ["same-http", "cross-http"], "subresource": "*", "expectation": "omitted"}, {"name": "secure-protocol", "expansion": "default", "source_scheme": "https", "source_context_list": "*", "delivery_type": "*", "delivery_value": "strict-origin", "redirection": "*", "origin": ["same-https", "cross-https"], "subresource": "*", "expectation": "origin"}]}, {"name": "strict-origin-when-cross-origin", "title": "Referrer Policy is set to 'strict-origin-when-cross-origin'", "description": "Check that a priori insecure subresource gets no referrer information. Otherwise, cross-origin subresources get the origin portion of the referrer URL and same-origin get the stripped referrer URL.", "specification_url": "https://w3c.github.io/webappsec-referrer-policy/#referrer-policy-strict-origin-when-cross-origin", "test_expansion": [{"name": "same-insecure", "expansion": "default", "source_scheme": "http", "source_context_list": "*", "delivery_type": "*", "delivery_value": "strict-origin-when-cross-origin", "redirection": "*", "origin": "same-http", "subresource": "*", "expectation": "stripped-referrer"}, {"name": "same-insecure", "expansion": "override", "source_scheme": "http", "source_context_list": "*", "delivery_type": "*", "delivery_value": "strict-origin-when-cross-origin", "redirection": "swap-origin", "origin": "same-http", "subresource": "*", "expectation": "origin"}, {"name": "cross-insecure", "expansion": "default", "source_scheme": "http", "source_context_list": "*", "delivery_type": "*", "delivery_value": "strict-origin-when-cross-origin", "redirection": "*", "origin": "cross-http", "subresource": "*", "expectation": "origin"}, {"name": "upgrade-protocol", "expansion": "default", "source_scheme": "http", "source_context_list": "*", "delivery_type": "*", "delivery_value": "strict-origin-when-cross-origin", "redirection": "*", "origin": ["same-https", "cross-https"], "subresource": "*", "expectation": "origin"}, {"name": "downgrade-protocol", "expansion": "default", "source_scheme": "https", "source_context_list": "*", "delivery_type": "*", "delivery_value": "strict-origin-when-cross-origin", "redirection": "*", "origin": ["same-http", "cross-http"], "subresource": "*", "expectation": "omitted"}, {"name": "same-secure", "expansion": "default", "source_scheme": "https", "source_context_list": "*", "delivery_type": "*", "delivery_value": "strict-origin-when-cross-origin", "redirection": "*", "origin": "same-https", "subresource": "*", "expectation": "stripped-referrer"}, {"name": "same-secure", "expansion": "override", "source_scheme": "https", "source_context_list": "*", "delivery_type": "*", "delivery_value": "strict-origin-when-cross-origin", "redirection": "swap-origin", "origin": "same-https", "subresource": "*", "expectation": "origin"}, {"name": "cross-secure", "expansion": "default", "source_scheme": "https", "source_context_list": "*", "delivery_type": "*", "delivery_value": "strict-origin-when-cross-origin", "redirection": "*", "origin": "cross-https", "subresource": "*", "expectation": "origin"}]}, {"name": "unsafe-url", "title": "Referrer Policy is set to 'unsafe-url'", "description": "Check that all sub-resources get the stripped referrer URL.", "specification_url": "https://w3c.github.io/webappsec-referrer-policy/#referrer-policy-unsafe-url", "test_expansion": [{"name": "generic", "expansion": "default", "source_scheme": "*", "source_context_list": "*", "delivery_type": "*", "delivery_value": "unsafe-url", "redirection": "*", "origin": "*", "subresource": "*", "expectation": "stripped-referrer"}]}], "delivery_key": "referrerPolicy", "excluded_tests": [{"name": "cross-origin-workers", "expansion": "*", "source_scheme": "*", "source_context_list": "*", "redirection": "*", "delivery_type": "*", "delivery_value": "*", "origin": ["cross-http", "cross-https"], "subresource": ["worker-classic", "worker-module", "sharedworker-classic"], "expectation": "*"}, {"name": "upgraded-protocol-workers", "expansion": "*", "source_scheme": "http", "source_context_list": "*", "delivery_type": "*", "delivery_value": "*", "redirection": "*", "origin": ["same-https", "cross-https"], "subresource": ["worker-classic", "worker-module", "sharedworker-classic"], "expectation": "*"}, {"name": "mixed-content-insecure-subresources", "expansion": "*", "source_scheme": "https", "source_context_list": "*", "delivery_type": "*", "delivery_value": "*", "redirection": "*", "origin": ["same-http", "cross-http"], "subresource": "*", "expectation": "*"}, {"name": "area-tag", "expansion": "*", "source_scheme": "*", "source_context_list": "*", "delivery_type": "*", "delivery_value": "*", "redirection": "*", "origin": "*", "subresource": "area-tag", "expectation": "*"}, {"name": "worker-requests-with-swap-origin-redirect", "expansion": "*", "source_scheme": "*", "source_context_list": "*", "delivery_type": "*", "delivery_value": "*", "redirection": "swap-origin", "origin": "*", "subresource": ["worker-classic", "worker-module", "sharedworker-classic"], "expectation": "*"}, {"name": "overhead-for-redirection", "expansion": "*", "source_scheme": "*", "source_context_list": "*", "delivery_type": "*", "delivery_value": "*", "redirection": ["keep-origin", "swap-origin"], "origin": "*", "subresource": ["a-tag", "area-tag"], "expectation": "*"}, {"name": "source-https-unsupported-by-web-platform-tests-runners", "expansion": "*", "source_scheme": "https", "source_context_list": "*", "delivery_type": "*", "delivery_value": "*", "redirection": "*", "origin": "*", "subresource": "*", "expectation": "*"}, {"name": "<link rel=noreferrer>'s delivery_value should be no-referrer", "expansion": "*", "source_scheme": "*", "source_context_list": "*", "delivery_type": "rel-noref", "delivery_value": [null, "no-referrer-when-downgrade", "same-origin", "origin", "origin-when-cross-origin", "strict-origin", "strict-origin-when-cross-origin", "unsafe-url"], "redirection": "*", "origin": "*", "subresource": "*", "expectation": "*"}, {"name": "expectation=stripped-referrer only", "expansion": "*", "source_scheme": "*", "source_context_list": "*", "redirection": "*", "delivery_type": "*", "delivery_value": "*", "origin": "*", "subresource": "*", "expectation": ["omitted", "origin"]}, {"name": "Only on the top context", "expansion": "*", "source_scheme": "*", "source_context_list": ["req", "srcdoc-inherit", "srcdoc", "iframe", "worker-classic", "worker-classic-data", "worker-module", "worker-module-data"], "redirection": "*", "delivery_type": "*", "delivery_value": "*", "origin": "*", "subresource": "*", "expectation": "*"}], "source_context_schema": {"supported_delivery_type": {"top": ["meta", "http-rp"], "iframe": ["meta", "http-rp"], "iframe-blank": ["meta"], "srcdoc": ["meta"], "worker-classic": ["http-rp"], "worker-module": ["http-rp"], "worker-classic-data": [], "worker-module-data": []}, "supported_subresource": {"top": "*", "iframe": "*", "iframe-blank": "*", "srcdoc": "*", "worker-classic": ["xhr", "fetch", "worker-classic", "worker-module"], "worker-module": ["xhr", "fetch", "worker-classic", "worker-module"], "worker-classic-data": ["xhr", "fetch"], "worker-module-data": ["xhr", "fetch"]}}, "subresource_schema": {"supported_delivery_type": {"iframe-tag": ["attr"], "img-tag": ["attr"], "script-tag": ["attr"], "a-tag": ["attr", "rel-noref"], "area-tag": ["attr"], "xhr": [], "fetch": [], "worker-module": [], "sharedworker-classic": [], "worker-classic": []}}, "source_context_list_schema": {"top": {"description": "Policy set by the top-level Document", "sourceContextList": [{"sourceContextType": "top", "policyDeliveries": ["policy"]}], "subresourcePolicyDeliveries": []}, "req": {"description": "Subresource request's policy should override Document's policy", "sourceContextList": [{"sourceContextType": "top", "policyDeliveries": ["anotherPolicy"]}], "subresourcePolicyDeliveries": ["nonNullPolicy"]}, "srcdoc-inherit": {"description": "srcdoc iframe should inherit parent Document's policy", "sourceContextList": [{"sourceContextType": "top", "policyDeliveries": ["policy"]}, {"sourceContextType": "srcdoc"}], "subresourcePolicyDeliveries": []}, "srcdoc": {"description": "srcdoc iframe's policy should override parent Document's policy", "sourceContextList": [{"sourceContextType": "top", "policyDeliveries": ["anotherPolicy"]}, {"sourceContextType": "srcdoc", "policyDeliveries": ["nonNullPolicy"]}], "subresourcePolicyDeliveries": []}, "iframe": {"description": "external iframe's policy should override parent Document's policy", "sourceContextList": [{"sourceContextType": "top", "policyDeliveries": ["anotherPolicy"]}, {"sourceContextType": "iframe", "policyDeliveries": ["policy"]}], "subresourcePolicyDeliveries": []}, "worker-classic": {"sourceContextList": [{"sourceContextType": "top", "policyDeliveries": ["anotherPolicy"]}, {"sourceContextType": "worker-classic", "policyDeliveries": ["policy"]}], "subresourcePolicyDeliveries": []}, "worker-classic-data": {"sourceContextList": [{"sourceContextType": "top", "policyDeliveries": ["anotherPolicy"]}, {"sourceContextType": "worker-classic-data", "policyDeliveries": ["policy"]}], "subresourcePolicyDeliveries": []}, "worker-module": {"sourceContextList": [{"sourceContextType": "top", "policyDeliveries": ["anotherPolicy"]}, {"sourceContextType": "worker-module", "policyDeliveries": ["policy"]}], "subresourcePolicyDeliveries": []}, "worker-module-data": {"sourceContextList": [{"sourceContextType": "top", "policyDeliveries": ["anotherPolicy"]}, {"sourceContextType": "worker-module-data", "policyDeliveries": ["policy"]}], "subresourcePolicyDeliveries": []}}, "test_expansion_schema": {"expansion": ["default", "override"], "delivery_type": ["attr", "rel-noref", "http-rp", "meta"], "delivery_value": [null, "no-referrer", "no-referrer-when-downgrade", "same-origin", "origin", "origin-when-cross-origin", "strict-origin", "strict-origin-when-cross-origin", "unsafe-url"], "origin": ["same-http", "same-https", "cross-http", "cross-https"], "source_context_list": ["top", "req", "srcdoc-inherit", "srcdoc", "iframe", "worker-classic", "worker-classic-data", "worker-module", "worker-module-data"], "source_scheme": ["http", "https"], "redirection": ["no-redirect", "keep-origin", "swap-origin"], "subresource": ["iframe-tag", "img-tag", "script-tag", "a-tag", "area-tag", "xhr", "worker-classic", "worker-module", "sharedworker-classic", "fetch"], "expectation": ["omitted", "origin", "stripped-referrer"]}};
